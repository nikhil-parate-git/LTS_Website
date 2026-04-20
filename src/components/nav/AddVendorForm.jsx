import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Building2,
  Clock,
  MapPin,
  Briefcase,
  FileText,
  ChevronDown,
  X,
  ImageIcon,
} from "lucide-react";
import Select from "react-select";
import { State, City } from "country-state-city";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AM_TIMES = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 1;
  return { label: `${hour}:00 AM`, value: `${hour}:00 AM` };
});

const PM_TIMES = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 1;
  return { label: `${hour}:00 PM`, value: `${hour}:00 PM` };
});

const INDIA_STATES = State.getStatesOfCountry("IN").map((s) => ({
  label: s.name,
  value: s.isoCode,
  isoCode: s.isoCode,
}));

const BUSINESS_TYPES = [
  { label: "Proprietor", value: "PROPRIETOR" },
  { label: "Partnership", value: "PARTNERSHIP" },
  { label: "Private Limited", value: "PRIVATE_LIMITED" },
  { label: "LLP", value: "LLP" },
];

// Static mock categories
const MOCK_CATEGORIES = [
  { id: "cat1", name: "Plumbing" },
  { id: "cat2", name: "Electrical" },
  { id: "cat3", name: "Carpentry" },
  { id: "cat4", name: "Cleaning" },
];

const MOCK_SUBCATEGORIES = {
  cat1: [
    { id: "s1", name: "Pipe Repair" },
    { id: "s2", name: "Drain Cleaning" },
    { id: "s3", name: "Tap Fitting" },
  ],
  cat2: [
    { id: "s4", name: "Wiring" },
    { id: "s5", name: "Switch Repair" },
    { id: "s6", name: "Inverter Setup" },
  ],
  cat3: [
    { id: "s7", name: "Furniture Repair" },
    { id: "s8", name: "Door Fitting" },
  ],
  cat4: [
    { id: "s9", name: "Home Cleaning" },
    { id: "s10", name: "Office Cleaning" },
  ],
};

const getSelectStyles = (hasError) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "8px",
    border: hasError
      ? "1px solid #f87171"
      : state.isFocused
        ? "1px solid #E23E08"
        : "1px solid #e2e8f0",
    backgroundColor: state.isFocused ? "#ffffff" : "#f8fafc",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 2px #fee2e2"
        : "0 0 0 2px #fff7ed"
      : "none",
    "&:hover": { borderColor: hasError ? "#f87171" : "#E23E08" },
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  placeholder: (base) => ({ ...base, color: "#94a3b8", fontSize: "14px" }),
  singleValue: (base) => ({ ...base, color: "#334155", fontSize: "14px" }),
  input: (base) => ({ ...base, color: "#334155", fontSize: "14px" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#E23E08"
      : state.isFocused
        ? "#fff7ed"
        : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#334155",
    fontSize: "14px",
    cursor: "pointer",
    "&:active": { backgroundColor: "#f97316" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 16px rgba(15,23,42,0.10)",
    zIndex: 100,
  }),
  menuList: (base) => ({ ...base, maxHeight: "200px", padding: "4px" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#94a3b8",
    padding: "0 8px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  clearIndicator: (base) => ({
    ...base,
    color: "#94a3b8",
    cursor: "pointer",
    padding: "0 4px",
    "&:hover": { color: "#E23E08" },
  }),
});

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: "#fff5f2", border: "1.5px solid #fcd5c4" }}
    >
      <Icon size={15} className="text-[#E23E08]" />
    </div>
    <h3 className="text-sm font-bold text-slate-800 tracking-widest uppercase">
      {title}
    </h3>
  </div>
);

const InputField = ({
  label,
  required,
  optional,
  placeholder,
  type = "text",
  field,
  form,
}) => {
  const hasError = form?.touched[field?.name] && form?.errors[field?.name];
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-slate-600 mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
          {optional && (
            <span className="text-slate-400 font-normal text-xs">
              {" "}
              (optional)
            </span>
          )}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...field}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 transition-all ${
          hasError
            ? "border-red-400 focus:border-red-400 focus:ring-red-50"
            : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"
        }`}
      />
      {hasError && (
        <p className="text-xs text-red-500 mt-1">{form.errors[field.name]}</p>
      )}
    </div>
  );
};

const TimeDropdown = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  placeholder,
}) => {
  const hasError = touched && error;
  const selectedOption = options.find((t) => t.value === value) || null;
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-1.5">
        {label}
      </label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(opt) => onChange(opt ? opt.value : "")}
        onBlur={onBlur}
        placeholder={placeholder}
        isClearable
        isSearchable={false}
        styles={getSelectStyles(hasError)}
      />
      {hasError && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const CompanyImageUpload = ({ file, onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputId = "company-image-input";

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = useCallback(
    (e) => {
      const picked = e.target.files?.[0];
      if (!picked) return;
      onFileChange(picked);
      e.target.value = "";
    },
    [onFileChange],
  );

  return (
    <div style={{ position: "relative" }}>
      <label className="block text-sm font-semibold text-slate-600 mb-1.5">
        Company Image <span className="text-red-500">*</span>
      </label>
      <div className="flex items-start gap-4">
        <div
          className="w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-slate-50"
          style={{
            border: previewUrl ? "2px solid #E23E08" : "2px dashed #cbd5e1",
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Company preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={24} className="text-slate-300" />
          )}
        </div>
        <div className="flex-1">
          <div className="w-full flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <label
              htmlFor={inputId}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 transition-colors cursor-pointer flex-shrink-0"
            >
              Choose File
            </label>
            <span className="px-3 text-sm text-slate-400 truncate flex-1">
              {file ? file.name : "No file chosen"}
            </span>
            {file && (
              <button
                type="button"
                onClick={() => onFileChange(null)}
                className="px-2 text-slate-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            Accepted: JPG, PNG, WEBP
          </p>
        </div>
      </div>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/*"
        onChange={handleChange}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
        }}
      />
    </div>
  );
};

let fileCounter = 0;
const FileUploadField = ({
  label,
  file,
  onFileChange,
  accept,
  optional,
  required,
}) => {
  const [inputId] = useState(() => `file-upload-${++fileCounter}`);
  const handleChange = useCallback(
    (e) => {
      const picked = e.target.files?.[0];
      if (!picked) return;
      onFileChange(picked);
      e.target.value = "";
    },
    [onFileChange],
  );

  return (
    <div style={{ position: "relative" }}>
      <label className="block text-sm font-semibold text-slate-600 mb-1.5">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && (
          <span className="text-slate-400 font-normal text-xs">
            {" "}
            (Optional)
          </span>
        )}
      </label>
      <div className="w-full flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
        <label
          htmlFor={inputId}
          className="px-4 py-2.5 text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 transition-colors cursor-pointer flex-shrink-0"
        >
          Choose File
        </label>
        <span className="px-3 text-sm text-slate-400 truncate flex-1">
          {file ? file.name : "No file chosen"}
        </span>
        {file && (
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="px-2 text-slate-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <input
        id={inputId}
        type="file"
        accept={accept || "*"}
        onChange={handleChange}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
        }}
      />
    </div>
  );
};

const SubCategoryMultiSelect = ({
  options,
  value,
  onChange,
  error,
  touched,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const safeOptions = Array.isArray(options) ? options : [];
  const safeValue = Array.isArray(value) ? value : [];

  const toggle = (id) => {
    if (disabled) return;
    const updated = safeValue.includes(id)
      ? safeValue.filter((v) => v !== id)
      : [...safeValue, id];
    onChange(updated);
  };

  const selectedLabels = safeOptions.filter((o) => safeValue.includes(o.id));

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          if (!disabled) setOpen(!open);
        }}
        className={`min-h-[42px] w-full px-3 py-2 rounded-lg border bg-slate-50 text-sm flex flex-wrap gap-1.5 items-center transition-all ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-slate-100"
            : "cursor-pointer"
        } ${
          touched && error
            ? "border-red-400"
            : open
              ? "border-[#E23E08] ring-2 ring-orange-50 bg-white"
              : "border-slate-200"
        }`}
      >
        {disabled ? (
          <span className="text-slate-400 text-sm">
            Select a category first
          </span>
        ) : selectedLabels.length === 0 ? (
          <span className="text-slate-400 text-sm">Select subcategories</span>
        ) : (
          selectedLabels.map((opt) => (
            <span
              key={opt.id}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-[#E23E08]"
            >
              {opt.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(opt.id);
                }}
              >
                <X size={10} />
              </button>
            </span>
          ))
        )}
        <ChevronDown
          size={14}
          className={`ml-auto text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {safeOptions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-400">
              No subcategories found
            </p>
          ) : (
            safeOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  safeValue.includes(opt.id)
                    ? "bg-orange-50 text-[#E23E08] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${safeValue.includes(opt.id) ? "bg-[#E23E08] border-[#E23E08]" : "border-slate-300"}`}
                >
                  {safeValue.includes(opt.id) && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3L3.5 5.5L8 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {opt.name}
              </div>
            ))
          )}
        </div>
      )}
      {touched && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const validationSchema = Yup.object({
  vendorName: Yup.string().required("Vendor name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  companyName: Yup.string().required("Company name is required"),
  serviceCategory: Yup.string().required("Service category is required"),
  serviceSubcategories: Yup.array()
    .min(1, "At least one subcategory is required")
    .required(),
  startedIn: Yup.string().matches(/^[0-9]{4}$/, "Enter a valid 4-digit year"),
  aboutUs: Yup.string().max(500, "Max 500 characters"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
  openingFrom: Yup.string(),
  openingTo: Yup.string(),
  openingDays: Yup.array(),
  officeAddress: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  pinCode: Yup.string().matches(/^[0-9]{6}$/, "PIN code must be 6 digits"),
  serviceRadius: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive"),
  serviceCities: Yup.string(),
  businessType: Yup.string(),
  experience: Yup.string(),
  servicesOffered: Yup.string(),
  aadhaarNo: Yup.string().matches(/^[0-9]{12}$/, "Aadhaar must be 12 digits"),
  panNo: Yup.string().matches(
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    "Invalid PAN format (e.g. ABCDE1234F)",
  ),
  gstin: Yup.string().matches(/^[0-9A-Z]{15}$/, "GSTIN must be 15 characters"),
  accountNumber: Yup.string(),
  accountHolderName: Yup.string(),
  ifscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  accountType: Yup.string(),
  upiId: Yup.string(),
});

const AddVendorForm = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyImageRef = useRef(null);
  const aadhaarFileRef = useRef(null);
  const panFileRef = useRef(null);
  const gstFileRef = useRef(null);

  const handleCompanyImageChange = useCallback((file) => {
    setCompanyImage(file);
    companyImageRef.current = file;
  }, []);
  const handleAadhaarFileChange = useCallback((file) => {
    setAadhaarFile(file);
    aadhaarFileRef.current = file;
  }, []);
  const handlePanFileChange = useCallback((file) => {
    setPanFile(file);
    panFileRef.current = file;
  }, []);
  const handleGstFileChange = useCallback((file) => {
    setGstFile(file);
    gstFileRef.current = file;
  }, []);

  const formik = useFormik({
    initialValues: {
      vendorName: "",
      phone: "",
      email: "",
      companyName: "",
      serviceCategory: "",
      serviceSubcategories: [],
      startedIn: "",
      aboutUs: "",
      password: "",
      openingFrom: "",
      openingTo: "",
      openingDays: [],
      officeAddress: "",
      city: "",
      state: "",
      pinCode: "",
      serviceRadius: "",
      serviceCities: "",
      businessType: "",
      experience: "",
      servicesOffered: "",
      aadhaarNo: "",
      panNo: "",
      gstin: "",
      accountNumber: "",
      accountHolderName: "",
      ifscCode: "",
      accountType: "",
      upiId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("name", values.vendorName);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("companyName", values.companyName);
        formData.append("serviceCategory", values.serviceCategory);
        values.serviceSubcategories.forEach((sub) =>
          formData.append("serviceSubcategories[]", sub),
        );
        if (values.password) formData.append("password", values.password);
        if (values.startedIn) formData.append("startedIn", values.startedIn);
        if (values.aboutUs) formData.append("aboutUs", values.aboutUs);
        if (values.openingFrom)
          formData.append("openingTime[from]", values.openingFrom);
        if (values.openingTo)
          formData.append("openingTime[to]", values.openingTo);
        values.openingDays.forEach((day) =>
          formData.append("openingDays[]", day),
        );
        formData.append(
          "addressInfo[officeAddress]",
          values.officeAddress || "",
        );
        formData.append("addressInfo[city]", values.city || "");
        formData.append("addressInfo[state]", values.state || "");
        formData.append("addressInfo[pinCode]", values.pinCode || "");
        if (values.serviceRadius)
          formData.append("addressInfo[serviceRadius]", values.serviceRadius);
        if (values.serviceCities) {
          values.serviceCities
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
            .forEach((city) =>
              formData.append("addressInfo[serviceCities][]", city),
            );
        }
        if (values.businessType)
          formData.append(
            "businessInfo[businessType]",
            values.businessType.toLowerCase(),
          );
        if (values.experience)
          formData.append("businessInfo[experience]", values.experience);
        if (values.servicesOffered) {
          values.servicesOffered
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .forEach((s) =>
              formData.append("businessInfo[servicesOffered][]", s),
            );
        }
        if (values.aadhaarNo)
          formData.append("documents[aadhaarNo]", values.aadhaarNo);
        if (values.panNo) formData.append("documents[panNo]", values.panNo);
        if (values.gstin) formData.append("documents[gstin]", values.gstin);
        if (values.accountNumber)
          formData.append("bankDetails[accountNumber]", values.accountNumber);
        if (values.accountHolderName)
          formData.append(
            "bankDetails[accountHolderName]",
            values.accountHolderName,
          );
        if (values.ifscCode)
          formData.append("bankDetails[ifscCode]", values.ifscCode);
        if (values.accountType)
          formData.append("bankDetails[accountType]", values.accountType);
        if (values.upiId) formData.append("bankDetails[upiId]", values.upiId);

        const imgFile = companyImageRef.current;
        const aadFile = aadhaarFileRef.current;
        const pFile = panFileRef.current;
        const gFile = gstFileRef.current;
        if (imgFile) formData.append("companyImage", imgFile);
        if (aadFile) formData.append("aadhaarCard", aadFile);
        if (pFile) formData.append("panCard", pFile);
        if (gFile) formData.append("gstCertificate", gFile);

        // ─── Replace this with your actual API call ───
        // const response = await fetch("/api/vendors", { method: "POST", body: formData });
        // if (!response.ok) throw new Error("Failed to create vendor");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } catch (err) {
        console.error("Error creating vendor:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleStateChange = (selectedOption) => {
    if (selectedOption) {
      formik.setFieldValue("state", selectedOption.label);
      const cities = City.getCitiesOfState("IN", selectedOption.isoCode).map(
        (c) => ({
          label: c.name,
          value: c.name,
        }),
      );
      setCityOptions(cities);
    } else {
      formik.setFieldValue("state", "");
      setCityOptions([]);
    }
    formik.setFieldValue("city", "");
  };

  const toggleDay = (day) => {
    const current = formik.values.openingDays;
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    formik.setFieldValue("openingDays", updated);
  };

  const field = (name) => ({ field: formik.getFieldProps(name), form: formik });

  const selectStyle = (name) =>
    `w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-600 outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
      formik.touched[name] && formik.errors[name]
        ? "border-red-400 focus:border-red-400 focus:ring-red-50"
        : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"
    }`;

  const selectedStateOption =
    INDIA_STATES.find((s) => s.label === formik.values.state) || null;
  const selectedCityOption =
    cityOptions.find((c) => c.value === formik.values.city) || null;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className="bg-white rounded-2xl w-full flex flex-col"
        style={{
          maxWidth: "920px",
          maxHeight: "92vh",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#E23E08] hover:border-orange-200 transition-all shadow-sm"
              >
                <ArrowLeft size={17} />
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-900">Add Vendor</h1>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <style>{`
            .vcard {
              background: #ffffff;
              border-radius: 14px;
              border: 1.5px solid #e2e8f0;
              box-shadow: 0 2px 8px rgba(15,23,42,0.06);
            }
            select {
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: right 12px center;
              padding-right: 36px;
            }
          `}</style>

          <form onSubmit={formik.handleSubmit} noValidate>
            {/* SECTION 1 — Basic Information */}
            <div className="vcard p-6 mb-4">
              <SectionHeader icon={Building2} title="Basic Information" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <InputField
                  label="Vendor Name"
                  required
                  placeholder="Enter Vendor Name"
                  {...field("vendorName")}
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                      const onlyDigits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      formik.setFieldValue("phone", onlyDigits);
                    }}
                    onBlur={formik.handleBlur("phone")}
                    maxLength={10}
                    inputMode="numeric"
                    className={`w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 transition-all ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-400 focus:border-red-400 focus:ring-red-50"
                        : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"
                    }`}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.phone}
                    </p>
                  ) : (
                    <p
                      className={`text-xs mt-1 text-right ${formik.values.phone.length === 10 ? "text-green-500" : "text-slate-400"}`}
                    >
                      {formik.values.phone.length}/10
                    </p>
                  )}
                </div>

                <InputField
                  label="Email"
                  required
                  placeholder="Enter Email"
                  type="email"
                  {...field("email")}
                />
                <InputField
                  label="Company Name"
                  required
                  placeholder="Enter Company Name"
                  {...field("companyName")}
                />

                {/* Service Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Service Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={selectStyle("serviceCategory")}
                    value={formik.values.serviceCategory}
                    onChange={(e) => {
                      const selectedCatId = e.target.value;
                      formik.setFieldValue("serviceCategory", selectedCatId);
                      formik.setFieldValue("serviceSubcategories", []);
                      setSubCategories(
                        selectedCatId
                          ? MOCK_SUBCATEGORIES[selectedCatId] || []
                          : [],
                      );
                    }}
                    onBlur={formik.handleBlur("serviceCategory")}
                  >
                    <option value="">Select Category</option>
                    {MOCK_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.serviceCategory &&
                    formik.errors.serviceCategory && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.serviceCategory}
                      </p>
                    )}
                </div>

                {/* Subcategories */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Service Subcategories{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <SubCategoryMultiSelect
                    options={subCategories}
                    value={formik.values.serviceSubcategories}
                    onChange={(val) =>
                      formik.setFieldValue("serviceSubcategories", val)
                    }
                    error={formik.errors.serviceSubcategories}
                    touched={formik.touched.serviceSubcategories}
                    disabled={!formik.values.serviceCategory}
                  />
                </div>

                <InputField
                  label="Started In (Year)"
                  placeholder="Enter The Year"
                  {...field("startedIn")}
                />

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    About Us
                  </label>
                  <textarea
                    placeholder="Short description (max 500 chars)"
                    maxLength={500}
                    rows={3}
                    {...formik.getFieldProps("aboutUs")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#E23E08] focus:bg-white focus:ring-2 focus:ring-orange-50 transition-all resize-none"
                  />
                  {formik.touched.aboutUs && formik.errors.aboutUs && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.aboutUs}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <CompanyImageUpload
                    file={companyImage}
                    onFileChange={handleCompanyImageChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...formik.getFieldProps("password")}
                      className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border bg-slate-50 text-sm outline-none focus:bg-white focus:ring-2 transition-all ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-400 focus:ring-red-50"
                          : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2 — Opening Hours */}
            <div className="vcard p-6 mb-4">
              <SectionHeader icon={Clock} title="Opening Hours" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <TimeDropdown
                  label="Opening Time From"
                  value={formik.values.openingFrom}
                  onChange={(val) => formik.setFieldValue("openingFrom", val)}
                  onBlur={() => formik.setFieldTouched("openingFrom", true)}
                  error={formik.errors.openingFrom}
                  touched={formik.touched.openingFrom}
                  options={AM_TIMES}
                  placeholder="Select opening time (AM)..."
                />
                <TimeDropdown
                  label="Opening Time To"
                  value={formik.values.openingTo}
                  onChange={(val) => formik.setFieldValue("openingTo", val)}
                  onBlur={() => formik.setFieldTouched("openingTo", true)}
                  error={formik.errors.openingTo}
                  touched={formik.touched.openingTo}
                  options={PM_TIMES}
                  placeholder="Select closing time (PM)..."
                />
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-2.5">
                    Opening Days
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                          formik.values.openingDays.includes(day)
                            ? "bg-[#E23E08] text-white border-[#E23E08]"
                            : "bg-white text-slate-500 border-slate-300 hover:border-[#E23E08] hover:text-[#E23E08]"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 — Address Information */}
            <div className="vcard p-6 mb-4">
              <SectionHeader icon={MapPin} title="Address Information" />
              <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                <InputField
                  label="Office Address"
                  placeholder="Enter office address"
                  {...field("officeAddress")}
                />
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    State
                  </label>
                  <Select
                    options={INDIA_STATES}
                    value={selectedStateOption}
                    onChange={handleStateChange}
                    onBlur={() => formik.setFieldTouched("state", true)}
                    placeholder="Search & select state..."
                    isClearable
                    isSearchable
                    styles={getSelectStyles(
                      formik.touched.state && formik.errors.state,
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    City
                  </label>
                  <Select
                    options={cityOptions}
                    value={selectedCityOption}
                    onChange={(opt) =>
                      formik.setFieldValue("city", opt ? opt.value : "")
                    }
                    onBlur={() => formik.setFieldTouched("city", true)}
                    placeholder={
                      formik.values.state
                        ? "Search & select city..."
                        : "Select state first"
                    }
                    isClearable
                    isSearchable
                    isDisabled={!formik.values.state}
                    styles={getSelectStyles(
                      formik.touched.city && formik.errors.city,
                    )}
                    noOptionsMessage={() => "No cities found"}
                  />
                </div>
                <InputField
                  label="PIN Code"
                  placeholder="6-digit PIN"
                  {...field("pinCode")}
                />
                <InputField
                  label="Service Radius (km)"
                  placeholder="e.g. 20"
                  {...field("serviceRadius")}
                />
                <InputField
                  label="Service Cities"
                  placeholder="Comma-separated cities"
                  {...field("serviceCities")}
                />
              </div>
            </div>

            {/* SECTION 4 — Business Information */}
            <div className="vcard p-6 mb-4">
              <SectionHeader icon={Briefcase} title="Business Information" />
              <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                    Business Type
                  </label>
                  <select
                    className={selectStyle("businessType")}
                    value={formik.values.businessType}
                    onChange={formik.handleChange("businessType")}
                    onBlur={formik.handleBlur("businessType")}
                  >
                    <option value="">Select Type</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Experience (Years)"
                  placeholder="Years of experience"
                  {...field("experience")}
                />
                <InputField
                  label="Services Offered"
                  placeholder="Comma-separated services"
                  {...field("servicesOffered")}
                />
              </div>
            </div>

            {/* SECTION 5 — Business Documents */}
            <div className="vcard p-6 mb-4">
              <SectionHeader icon={FileText} title="Business Documents" />
              <div className="grid grid-cols-3 gap-x-6 gap-y-5 mb-6">
                <InputField
                  label="Aadhaar No."
                  placeholder="12-digit Aadhaar"
                  {...field("aadhaarNo")}
                />
                <InputField
                  label="PAN No."
                  placeholder="ABCDE1234F"
                  {...field("panNo")}
                />
                <InputField
                  label="GSTIN"
                  placeholder="15-digit GSTIN"
                  {...field("gstin")}
                />
              </div>
              <div
                className="border border-dashed border-slate-300 rounded-xl p-5"
                style={{ background: "#f8fafc" }}
              >
                <p className="text-sm font-bold text-slate-600 mb-4">
                  Upload Documents
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <FileUploadField
                    label="Aadhaar Card"
                    required
                    file={aadhaarFile}
                    onFileChange={handleAadhaarFileChange}
                    accept="image/*,application/pdf"
                  />
                  <FileUploadField
                    label="PAN Card"
                    required
                    file={panFile}
                    onFileChange={handlePanFileChange}
                    accept="image/*,application/pdf"
                  />
                  <div className="col-span-2">
                    <FileUploadField
                      label="GST / Shop Certificate"
                      optional
                      file={gstFile}
                      onFileChange={handleGstFileChange}
                      accept="image/*,application/pdf"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3 rounded-xl text-sm font-bold text-white bg-[#E23E08] hover:bg-orange-600 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Add Vendor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVendorForm;
