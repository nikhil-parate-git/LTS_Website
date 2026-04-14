import { useEffect, useCallback, memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  submitEnquiry,
  resetStatus,
} from "../../../redux/slice/services/enquriySlice";
import { toast } from "react-toastify";

// ─── Validation schema — defined outside to avoid recreating on every render
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Phone number is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().min(10, "Message too short!").required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

// ─── FieldError ────────────────────────────────────────────────────────────────
const FieldError = memo(function FieldError({ touched, error }) {
  if (!touched || !error) return null;
  return (
    <p className="text-red-500 text-[11px] font-semibold mt-0.5">{error}</p>
  );
});

// ─── EnquiryModal ──────────────────────────────────────────────────────────────
const EnquiryModal = memo(function EnquiryModal({
  isOpen,
  onClose,
  serviceName,
}) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.enquiry);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(submitEnquiry(values));
    },
  });

  // Success handling
  useEffect(() => {
    if (success) {
      toast.success("Form submitted successfully!");
      formik.resetForm();
      dispatch(resetStatus());
      onClose();
    }
  }, [success, dispatch, onClose]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      dispatch(resetStatus());
    }
  }, [isOpen, dispatch]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-3 bg-black/60 backdrop-blur-sm overflow-y-auto py-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 flex justify-between items-center text-white">
          <div>
            <h3 className="text-xl font-black">Send Enquiry</h3>
            <p className="text-[10px] font-bold tracking-widest opacity-80">
              Local Trade Street
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:rotate-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          {/* API Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-black flex items-center gap-1">
                <User size={12} className="text-orange-500" /> Full Name
              </label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-200"}`}
              />
              <FieldError
                touched={formik.touched.name}
                error={formik.errors.name}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-black flex items-center gap-1">
                <Phone size={12} className="text-orange-500" /> Contact
              </label>
              <input
                type="text"
                maxLength={10}
                {...formik.getFieldProps("phone")}
                className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-200"}`}
                placeholder="10 digit number"
              />
              <FieldError
                touched={formik.touched.phone}
                error={formik.errors.phone}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black flex items-center gap-1">
              <Mail size={12} className="text-orange-500" /> Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-200"}`}
            />
            <FieldError
              touched={formik.touched.email}
              error={formik.errors.email}
            />
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black flex items-center gap-1">
              <MessageSquare size={12} className="text-orange-500" /> Subject
            </label>
            <input
              type="text"
              {...formik.getFieldProps("subject")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.subject && formik.errors.subject ? "border-red-500" : "border-gray-200"}`}
              placeholder="e.g. Service Inquiry"
            />
            <FieldError
              touched={formik.touched.subject}
              error={formik.errors.subject}
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black">
              Message
            </label>
            <textarea
              rows="3"
              {...formik.getFieldProps("message")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all resize-none ${formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-200"}`}
            />
            <FieldError
              touched={formik.touched.message}
              error={formik.errors.message}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-70 transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Send Inquiry <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
});

export default EnquiryModal;
