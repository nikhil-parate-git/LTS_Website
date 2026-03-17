import React, { useEffect, useState } from "react";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../../redux/slice/customerAuth/sendOtpSlice";
import ProfileVerifyOtp from "./ProfileVerifyOtp";
import { toast } from "react-toastify";
const ProfileLogin = ({ onClose }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.otp);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    if (success) {
      setShowOtp(true);
    }
  }, [success]);

  useEffect(() => {
    setShowOtp(false);
    // Agar aapke slice mein reset action hai toh yahan dispatch karein
    // dispatch(resetOtpState()); 
  }, []);

  const handleLogin = () => {
    if (!formData.name || formData.phone.length < 10) {
      toast.warning("Please enter name or phone number",{
        autoClose:1500
      });
      return;
    }
    dispatch(sendOtp(formData));
  };

  if (showOtp && success) {
    return <ProfileVerifyOtp phone={formData.phone} onClose={onClose} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="relative w-full max-w-[650px] bg-white rounded-2xl shadow-2xl px-8 py-9 z-10"
        style={{ animation: "slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-200 hover:rotate-90"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        <div className="text-center mb-1">
          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            Gain Complete Access & Connect
          </h2>
          <p className="text-xl font-bold text-gray-900 leading-snug">
            with thousands of verified businesses in{" "}
            <span className="text-orange-500">India</span>
          </p>
        </div>

        <hr className="border-gray-100 mb-6 mt-4" />

        <div className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-700 mb-1.5">
              Enter Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label className="block text-sm text-left font-medium text-gray-700 mb-1.5">
              Enter Your Contact Number
            </label>
            <div className="flex rounded-xl border border-gray-200 bg-gray-50 overflow-hidden focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
              <button className="flex items-center gap-1 px-3 h-12 border-r border-gray-200 text-gray-700 text-sm font-semibold bg-transparent">
                🇮🇳 +91
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              <input
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter 10-digit mobile number"
                className="flex-1 h-12 px-4 bg-transparent text-gray-900 text-sm outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 mt-1 shadow-lg active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #f97316, #ea580c)",
              boxShadow: loading ? "none" : "0 4px 14px rgba(234,88,12,0.35)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Log In with OTP"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProfileLogin;