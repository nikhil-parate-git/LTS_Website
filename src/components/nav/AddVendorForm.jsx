import React, { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  setPhone,
  resetAll,
} from "../../redux/slice/addvendorform/otpSlice.js";
import {
  fetchCategories,
  fetchSubCategories,
  fetchBusinessTypes,
  clearSubCategories,
} from "../../redux/slice/addvendorform/allDropdownSlice.js";
import {
  createVendor,
  resetVendorState,
} from "../../redux/slice/addvendorform/addVendorSlice.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import SEO from "../../hooks/useSEO";
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
  ShieldCheck,
  Phone,
  LogIn,
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

const getSelectStyles = (hasError, isDisabled) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    borderRadius: "8px",
    border: hasError
      ? "1px solid #f87171"
      : state.isFocused
        ? "1px solid #E23E08"
        : "1px solid #e2e8f0",
    backgroundColor: isDisabled
      ? "#f1f5f9"
      : state.isFocused
        ? "#ffffff"
        : "#f8fafc",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 2px #fee2e2"
        : "0 0 0 2px #fff7ed"
      : "none",
    "&:hover": {
      borderColor: isDisabled ? "#e2e8f0" : hasError ? "#f87171" : "#E23E08",
    },
    fontSize: "14px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
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
  disabled,
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
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 transition-all ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""} ${hasError ? "border-red-400 focus:border-red-400 focus:ring-red-50" : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"}`}
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
  disabled,
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
        isDisabled={disabled}
        styles={getSelectStyles(hasError, disabled)}
      />
      {hasError && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

const CompanyImageUpload = ({ file, onFileChange, disabled }) => {
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
      if (disabled) return;
      const picked = e.target.files?.[0];
      if (!picked) return;
      onFileChange(picked);
      e.target.value = "";
    },
    [onFileChange, disabled],
  );

  return (
    <div style={{ position: "relative" }}>
      <label className="block text-sm font-semibold text-slate-600 mb-1.5">
        Company Image <span className="text-red-500">*</span>
      </label>
      <div
        className={`flex items-start gap-4 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
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
              htmlFor={disabled ? undefined : inputId}
              className={`px-4 py-2.5 text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 transition-colors flex-shrink-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Choose File
            </label>
            <span className="px-3 text-sm text-slate-400 truncate flex-1">
              {file ? file.name : "No file chosen"}
            </span>
            {file && !disabled && (
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
        disabled={disabled}
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
  disabled,
}) => {
  const [inputId] = useState(() => `file-upload-${++fileCounter}`);
  const handleChange = useCallback(
    (e) => {
      if (disabled) return;
      const picked = e.target.files?.[0];
      if (!picked) return;
      onFileChange(picked);
      e.target.value = "";
    },
    [onFileChange, disabled],
  );

  return (
    <div
      style={{ position: "relative" }}
      className={disabled ? "opacity-50 pointer-events-none" : ""}
    >
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
          htmlFor={disabled ? undefined : inputId}
          className={`px-4 py-2.5 text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 transition-colors flex-shrink-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Choose File
        </label>
        <span className="px-3 text-sm text-slate-400 truncate flex-1">
          {file ? file.name : "No file chosen"}
        </span>
        {file && !disabled && (
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
        disabled={disabled}
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
  loading,
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
    if (disabled || loading) return;
    const updated = safeValue.includes(id)
      ? safeValue.filter((v) => v !== id)
      : [...safeValue, id];
    onChange(updated);
  };

  const selectedLabels = safeOptions.filter((o) => safeValue.includes(o.id));

  const getPlaceholder = () => {
    if (loading) return "Loading subcategories...";
    if (disabled) return "Select a category first";
    if (selectedLabels.length === 0) return "Select subcategories";
    return null;
  };

  const ph = getPlaceholder();

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          if (!disabled && !loading) setOpen(!open);
        }}
        className={`min-h-[42px] w-full px-3 py-2 rounded-lg border bg-slate-50 text-sm flex flex-wrap gap-1.5 items-center transition-all ${
          disabled || loading
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
        {ph ? (
          <span className="text-slate-400 text-sm">{ph}</span>
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

      {open && !disabled && !loading && (
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
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-colors ${safeValue.includes(opt.id) ? "bg-orange-50 text-[#E23E08] font-semibold" : "text-slate-700 hover:bg-slate-50"}`}
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

/* ─────────────────────────────────────────────
   OTP Modal
───────────────────────────────────────────── */
const OtpModal = ({ phone, onClose }) => {
  const dispatch = useDispatch();
  const { verifyOtpLoading, verifyOtpError, sendOtpLoading } = useSelector(
    (state) => state.vendorOtp,
  );
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    refs[0].current?.focus();
  }, []);
  useEffect(() => {
    if (resendTimer === 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (idx, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const arr = otp.split("");
    arr[idx] = digit;
    const newOtp = arr.join("").slice(0, 4);
    setOtp(newOtp);
    if (digit && idx < 3) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (!otp[idx] && idx > 0) {
        refs[idx - 1].current?.focus();
        const arr = otp.split("");
        arr[idx - 1] = "";
        setOtp(arr.join(""));
      } else {
        const arr = otp.split("");
        arr[idx] = "";
        setOtp(arr.join(""));
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="bg-white rounded-2xl w-full flex flex-col items-center"
        style={{
          maxWidth: "380px",
          padding: "32px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "#fff5f2", border: "1.5px solid #fcd5c4" }}
        >
          <ShieldCheck size={26} className="text-[#E23E08]" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">
          Verify Phone Number
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Enter the 4-digit OTP sent to{" "}
          <span className="font-semibold text-slate-700">+91 {phone}</span>
        </p>
        <div className="flex gap-3 mb-4">
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              ref={refs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all"
              style={{
                borderColor: otp[idx] ? "#E23E08" : "#e2e8f0",
                background: otp[idx] ? "#fff7f5" : "#f8fafc",
                color: "#1e293b",
              }}
            />
          ))}
        </div>
        {verifyOtpError && (
          <p className="text-xs text-red-500 mb-3 text-center">
            {verifyOtpError}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            if (otp.length === 4) dispatch(verifyOtp({ phone, otp }));
          }}
          disabled={otp.length !== 4 || verifyOtpLoading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#E23E08] hover:bg-orange-600 active:scale-95 transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {verifyOtpLoading ? "Verifying..." : "Verify OTP"}
        </button>
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            onClick={() => {
              dispatch(sendOtp(phone));
              setResendTimer(30);
              setOtp("");
            }}
            disabled={resendTimer > 0 || sendOtpLoading}
            className="text-sm font-semibold text-[#E23E08] hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
          >
            {sendOtpLoading
              ? "Sending..."
              : resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "Resend OTP"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Validation Schema
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const AddVendorForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const { isPhoneVerified, otpSent, sendOtpLoading } = useSelector(
    (state) => state.vendorOtp,
  );
  const {
    categories,
    categoriesLoading,
    subCategories,
    subCategoriesLoading,
    businessTypes,
    businessTypesLoading,
  } = useSelector((state) => state.vendorForm);

  const { loading: isSubmitting, success: vendorSuccess } = useSelector(
    (state) => state.addVendor,
  );

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

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

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBusinessTypes());
  }, [dispatch]);

  useEffect(() => {
    if (isPhoneVerified) setShowOtpModal(false);
  }, [isPhoneVerified]);
  useEffect(() => {
    if (otpSent) setShowOtpModal(true);
  }, [otpSent]);

  useEffect(() => {
    if (vendorSuccess) {
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      dispatch(resetVendorState());
    }
  }, [vendorSuccess, onSuccess, onClose, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAll());
      dispatch(resetVendorState());
    };
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
      if (!isPhoneVerified) return;

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
      formData.append("addressInfo[officeAddress]", values.officeAddress || "");
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
      if (companyImageRef.current)
        formData.append("companyImage", companyImageRef.current);
      if (aadhaarFileRef.current)
        formData.append("aadhaarCard", aadhaarFileRef.current);
      if (panFileRef.current) formData.append("panCard", panFileRef.current);
      if (gstFileRef.current)
        formData.append("gstCertificate", gstFileRef.current);

      dispatch(createVendor(formData));
    },
  });

  const handleSendOtp = () => {
    formik.setFieldTouched("phone", true, true);
    const phoneVal = formik.values.phone;
    if (!/^[0-9]{10}$/.test(phoneVal)) return;
    dispatch(setPhone(phoneVal));
    dispatch(sendOtp(phoneVal));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    formik.setFieldValue("serviceCategory", catId);
    formik.setFieldValue("serviceSubcategories", []);
    if (catId) {
      dispatch(fetchSubCategories(catId));
    } else {
      dispatch(clearSubCategories());
    }
  };

  const handleStateChange = (selectedOption) => {
    if (selectedOption) {
      formik.setFieldValue("state", selectedOption.label);
      setCityOptions(
        City.getCitiesOfState("IN", selectedOption.isoCode).map((c) => ({
          label: c.name,
          value: c.name,
        })),
      );
    } else {
      formik.setFieldValue("state", "");
      setCityOptions([]);
    }
    formik.setFieldValue("city", "");
  };

  const toggleDay = (day) => {
    if (!isPhoneVerified) return;
    const current = formik.values.openingDays;
    formik.setFieldValue(
      "openingDays",
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    );
  };

  const field = (name) => ({ field: formik.getFieldProps(name), form: formik });

  const selectStyle = (name) =>
    `w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-600 outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${!isPhoneVerified ? "opacity-50 cursor-not-allowed bg-slate-100" : ""} ${formik.touched[name] && formik.errors[name] ? "border-red-400 focus:border-red-400 focus:ring-red-50" : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"}`;

  const selectedStateOption =
    INDIA_STATES.find((s) => s.label === formik.values.state) || null;
  const selectedCityOption =
    cityOptions.find((c) => c.value === formik.values.city) || null;
  const f = !isPhoneVerified;

  return (
    <>
      <SEO
        title="Add Vendor | Local Trade Street"
        description="Register a new vendor on Local Trade Street. Fill in vendor details, contact information, business documents, and service areas to onboard a trusted local service provider."
        robots="noindex, nofollow"
        ogType="website"
        siteName="Local Trade Street"
      />

      {showOtpModal && (
        <OtpModal
          phone={formik.values.phone}
          onClose={() => setShowOtpModal(false)}
        />
      )}

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
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 flex-shrink-0 gap-2 flex-wrap">
            {/* Left — back arrow + title */}
            <div className="flex items-center gap-3 min-w-0">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#E23E08] hover:border-orange-200 transition-all shadow-sm flex-shrink-0"
                >
                  <ArrowLeft size={17} />
                </button>
              )}
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                Add Vendor
              </h1>
            </div>

            {/* Right — login button + verify badge + close */}
            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
              {/* ── LOGIN BUTTON ── */}
              <a
                href="https://vendor.localtradestreet.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 active:scale-95 transition-all shadow-sm whitespace-nowrap"
              >
                <LogIn size={14} />
                <span className="hidden xs:inline">Vendor </span>Login
              </a>

              {/* Phone verified badge */}
              <div
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isPhoneVerified ? "bg-green-50 text-green-700 border border-green-200" : "bg-orange-50 text-orange-700 border border-orange-200"}`}
              >
                {isPhoneVerified ? (
                  <>
                    <ShieldCheck size={12} /> Phone Verified
                  </>
                ) : (
                  <>
                    <Phone size={12} /> Not Verified
                  </>
                )}
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all flex-shrink-0"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div
            className="overflow-y-auto flex-1 px-4 sm:px-6 py-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .vcard { background:#ffffff; border-radius:14px; border:1.5px solid #e2e8f0; box-shadow:0 2px 8px rgba(15,23,42,0.06); }
              select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 12px center; padding-right:36px; }
              .freeze-overlay { position:relative; }
              .freeze-overlay::after { content:''; position:absolute; inset:0; background:rgba(248,250,252,0.55); border-radius:14px; z-index:10; pointer-events:none; }
              div.overflow-y-auto::-webkit-scrollbar { display:none; }
              @media (max-width: 640px) {
                .grid-cols-2-resp { grid-template-columns: 1fr !important; }
                .grid-cols-3-resp { grid-template-columns: 1fr !important; }
                .col-span-2-resp { grid-column: span 1 !important; }
              }
            `}</style>

            {!isPhoneVerified && (
              <div
                className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ background: "#fff9f7", borderColor: "#fcd5c4" }}
              >
                <Phone size={16} className="text-[#E23E08] flex-shrink-0" />
                <p className="text-sm text-slate-600 flex-1">
                  <span className="font-semibold text-slate-800">
                    Verify your phone number first
                  </span>{" "}
                  — enter your 10-digit phone below and click{" "}
                  <span className="font-semibold text-[#E23E08]">Send OTP</span>{" "}
                  to unlock the rest of the form.
                </p>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} noValidate>
              {/* SECTION 1 — Basic Information */}
              <div className="vcard p-4 sm:p-6 mb-4">
                <SectionHeader icon={Building2} title="Basic Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <InputField
                    label="Vendor Name"
                    required
                    placeholder="Enter Vendor Name"
                    disabled={f}
                    {...field("vendorName")}
                  />

                  {/* Phone + OTP */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="tel"
                          placeholder="10-digit phone"
                          value={formik.values.phone}
                          maxLength={10}
                          inputMode="numeric"
                          disabled={isPhoneVerified}
                          onChange={(e) => {
                            if (isPhoneVerified) return;
                            formik.setFieldValue(
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10),
                            );
                          }}
                          onBlur={formik.handleBlur("phone")}
                          className={`w-full px-3.5 py-2.5 rounded-lg border bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:ring-2 transition-all ${isPhoneVerified ? "opacity-60 cursor-not-allowed bg-slate-100" : ""} ${formik.touched.phone && formik.errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-50" : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"}`}
                        />
                      </div>
                      {isPhoneVerified ? (
                        <div className="flex items-center gap-1.5 px-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex-shrink-0">
                          <ShieldCheck size={13} /> Verified
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={
                            sendOtpLoading || formik.values.phone.length !== 10
                          }
                          className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E23E08] hover:bg-orange-600 active:scale-95 transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sendOtpLoading ? "Sending..." : "Send OTP"}
                        </button>
                      )}
                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.phone}
                      </p>
                    ) : (
                      !isPhoneVerified && (
                        <p
                          className={`text-xs mt-1 text-right ${formik.values.phone.length === 10 ? "text-green-500" : "text-slate-400"}`}
                        >
                          {formik.values.phone.length}/10
                        </p>
                      )
                    )}
                    {otpSent && !isPhoneVerified && (
                      <p className="text-xs text-[#E23E08] mt-1 font-medium">
                        OTP sent!{" "}
                        <button
                          type="button"
                          onClick={() => setShowOtpModal(true)}
                          className="underline"
                        >
                          Click here to enter OTP
                        </button>
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Email"
                    required
                    placeholder="Enter Email"
                    type="email"
                    disabled={f}
                    {...field("email")}
                  />
                  <InputField
                    label="Company Name"
                    required
                    placeholder="Enter Company Name"
                    disabled={f}
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
                      disabled={f || categoriesLoading}
                      onChange={handleCategoryChange}
                      onBlur={formik.handleBlur("serviceCategory")}
                    >
                      <option value="">
                        {categoriesLoading
                          ? "Loading categories..."
                          : "Select Category"}
                      </option>
                      {categories.map((cat) => (
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
                      disabled={f || !formik.values.serviceCategory}
                      loading={subCategoriesLoading}
                    />
                  </div>

                  <InputField
                    label="Started In (Year)"
                    placeholder="Enter The Year"
                    disabled={f}
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
                      disabled={f}
                      {...formik.getFieldProps("aboutUs")}
                      className={`w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#E23E08] focus:bg-white focus:ring-2 focus:ring-orange-50 transition-all resize-none ${f ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {formik.touched.aboutUs && formik.errors.aboutUs && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.aboutUs}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <CompanyImageUpload
                      file={companyImage}
                      onFileChange={handleCompanyImageChange}
                      disabled={f}
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
                        disabled={f}
                        {...formik.getFieldProps("password")}
                        className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border bg-slate-50 text-sm outline-none focus:bg-white focus:ring-2 transition-all ${f ? "opacity-50 cursor-not-allowed" : ""} ${formik.touched.password && formik.errors.password ? "border-red-400 focus:ring-red-50" : "border-slate-200 focus:border-[#E23E08] focus:ring-orange-50"}`}
                      />
                      {!f && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      )}
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
              <div
                className={`vcard p-4 sm:p-6 mb-4 ${f ? "freeze-overlay" : ""}`}
              >
                <SectionHeader icon={Clock} title="Opening Hours" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <TimeDropdown
                    label="Opening Time From"
                    value={formik.values.openingFrom}
                    onChange={(val) => formik.setFieldValue("openingFrom", val)}
                    onBlur={() => formik.setFieldTouched("openingFrom", true)}
                    error={formik.errors.openingFrom}
                    touched={formik.touched.openingFrom}
                    options={AM_TIMES}
                    placeholder="Select opening time (AM)..."
                    disabled={f}
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
                    disabled={f}
                  />
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-600 mb-2.5">
                      Opening Days
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {DAYS.map((day) => (
                        <button
                          key={day}
                          type="button"
                          disabled={f}
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${f ? "opacity-50 cursor-not-allowed" : ""} ${formik.values.openingDays.includes(day) ? "bg-[#E23E08] text-white border-[#E23E08]" : "bg-white text-slate-500 border-slate-300 hover:border-[#E23E08] hover:text-[#E23E08]"}`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 — Address Information */}
              <div
                className={`vcard p-4 sm:p-6 mb-4 ${f ? "freeze-overlay" : ""}`}
              >
                <SectionHeader icon={MapPin} title="Address Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                  <InputField
                    label="Office Address"
                    placeholder="Enter office address"
                    disabled={f}
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
                      isDisabled={f}
                      styles={getSelectStyles(
                        formik.touched.state && formik.errors.state,
                        f,
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
                      isDisabled={f || !formik.values.state}
                      styles={getSelectStyles(
                        formik.touched.city && formik.errors.city,
                        f || !formik.values.state,
                      )}
                      noOptionsMessage={() => "No cities found"}
                    />
                  </div>
                  <InputField
                    label="PIN Code"
                    placeholder="6-digit PIN"
                    disabled={f}
                    {...field("pinCode")}
                  />
                  <InputField
                    label="Service Radius (km)"
                    placeholder="e.g. 20"
                    disabled={f}
                    {...field("serviceRadius")}
                  />
                  <InputField
                    label="Service Cities"
                    placeholder="Comma-separated cities"
                    disabled={f}
                    {...field("serviceCities")}
                  />
                </div>
              </div>

              {/* SECTION 4 — Business Information */}
              <div
                className={`vcard p-4 sm:p-6 mb-4 ${f ? "freeze-overlay" : ""}`}
              >
                <SectionHeader icon={Briefcase} title="Business Information" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                      Business Type
                    </label>
                    <select
                      className={selectStyle("businessType")}
                      value={formik.values.businessType}
                      onChange={formik.handleChange("businessType")}
                      onBlur={formik.handleBlur("businessType")}
                      disabled={f || businessTypesLoading}
                    >
                      <option value="">
                        {businessTypesLoading ? "Loading..." : "Select Type"}
                      </option>
                      {businessTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputField
                    label="Experience (Years)"
                    placeholder="Years of experience"
                    disabled={f}
                    {...field("experience")}
                  />
                  <InputField
                    label="Services Offered"
                    placeholder="Comma-separated services"
                    disabled={f}
                    {...field("servicesOffered")}
                  />
                </div>
              </div>

              {/* SECTION 5 — Business Documents */}
              <div
                className={`vcard p-4 sm:p-6 mb-4 ${f ? "freeze-overlay" : ""}`}
              >
                <SectionHeader icon={FileText} title="Business Documents" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 mb-6">
                  <InputField
                    label="Aadhaar No."
                    placeholder="12-digit Aadhaar"
                    disabled={f}
                    {...field("aadhaarNo")}
                  />
                  <InputField
                    label="PAN No."
                    placeholder="ABCDE1234F"
                    disabled={f}
                    {...field("panNo")}
                  />
                  <InputField
                    label="GSTIN"
                    placeholder="15-digit GSTIN"
                    disabled={f}
                    {...field("gstin")}
                  />
                </div>
                <div
                  className="border border-dashed border-slate-300 rounded-xl p-4 sm:p-5"
                  style={{ background: "#f8fafc" }}
                >
                  <p className="text-sm font-bold text-slate-600 mb-4">
                    Upload Documents
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <FileUploadField
                      label="Aadhaar Card"
                      required
                      file={aadhaarFile}
                      onFileChange={handleAadhaarFileChange}
                      accept="image/*,application/pdf"
                      disabled={f}
                    />
                    <FileUploadField
                      label="PAN Card"
                      required
                      file={panFile}
                      onFileChange={handlePanFileChange}
                      accept="image/*,application/pdf"
                      disabled={f}
                    />
                    <div className="col-span-1 sm:col-span-2">
                      <FileUploadField
                        label="GST / Shop Certificate"
                        optional
                        file={gstFile}
                        onFileChange={handleGstFileChange}
                        accept="image/*,application/pdf"
                        disabled={f}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-2 pb-2">
                {!isPhoneVerified && (
                  <p className="text-xs text-slate-400">
                    Verify your phone number to enable submission
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !isPhoneVerified}
                  className="px-10 py-3 rounded-xl text-sm font-bold text-white bg-[#E23E08] hover:bg-orange-600 active:scale-95 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Add Vendor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendorForm;
