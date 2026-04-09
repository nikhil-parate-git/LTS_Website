import React, { useEffect } from "react";
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

const EnquiryModal = ({ isOpen, onClose, serviceName }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.enquiry);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "", // API expects 'phone'
      subject: "", // Keep it blank as requested
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
        .required("Phone number is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().min(10, "Message too short!").required("Required"),
    }),
    onSubmit: (values) => {
      // Now sending exact keys required by your API
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

  // Scroll lock & reset
  useEffect(() => {
    if (!isOpen) {
      dispatch(resetStatus());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-3 bg-black/60 backdrop-blur-sm overflow-y-auto py-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 flex justify-between items-center text-white">
          <div>
            <h3 className="text-xl font-black ">
              Send Enquiry
            </h3>
            <p className="text-[10px] font-bold tracking-widest opacity-80">
              Local Trade Street
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:rotate-90 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          {/* Error Message from API */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[13px] font-semibold text-black  flex items-center gap-1">
                <User size={12} className="text-orange-500" /> Full Name
              </label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-200"}`}
              />
            </div>

            {/* Phone (Exactly 10 Digits) */}
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
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black  flex items-center gap-1">
              <Mail size={12} className="text-orange-500" /> Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-200"}`}
            />
          </div>

          {/* Subject (Blank initially) */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black  flex items-center gap-1">
              <MessageSquare size={12} className="text-orange-500" /> Subject
            </label>
            <input
              type="text"
              {...formik.getFieldProps("subject")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all ${formik.touched.subject && formik.errors.subject ? "border-red-500" : "border-gray-200"}`}
              placeholder="e.g. Service Inquiry"
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-black ">
              Message
            </label>
            <textarea
              rows="3"
              {...formik.getFieldProps("message")}
              className={`w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-orange-500 transition-all resize-none ${formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-200"}`}
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
};

export default EnquiryModal;
