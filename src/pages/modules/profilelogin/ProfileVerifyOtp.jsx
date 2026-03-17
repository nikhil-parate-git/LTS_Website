import React, { useEffect, useState, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../../redux/slice/customerAuth/verifyOtpSlice";

const ProfileVerifyOtp = ({ phone = "", onClose }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.verifyOtp);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length < 4) {
      return;
    }
    dispatch(verifyOtp({ phone: phone, otp: otpString }));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  }, [success, onClose]);


  // Inside ProfileVerifyOtp.js handleVerify success logic:
// useEffect(() => {
//   if (success) {
//     // Maan lijiye aapke API response mein token aur user info hai
//     localStorage.setItem("token", "token"); 
//     localStorage.setItem("user", JSON.stringify({ name: "Aniket" })); // Example
    
//     setTimeout(() => {
//       onClose(); // Modal close hoga aur Navbar automatic update ho jayega
//     }, 1000);
//   }
// }, [success]);


  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10"
        style={{ animation: "slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all hover:rotate-90"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        <h2 className="text-center text-base sm:text-lg font-bold text-gray-900 mb-7 px-2">
          Enter 4-digit OTP sent on <span className="whitespace-nowrap">+91-{phone}</span>
        </h2>

        <div className="flex justify-center gap-3 sm:gap-4 mb-5">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-gray-200 bg-white text-center text-2xl font-bold text-gray-800 focus:border-orange-500 outline-none transition-all"
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          Didn't receive OTP? <span className="text-gray-400">Resend SMS in 60 sec</span>
        </p>

        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length < 4}
          className="w-full h-12 rounded-xl text-white font-semibold text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          style={{
            background: loading ? "#cbd5e1" : "linear-gradient(135deg, #f97316, #ea580c)",
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify"}
        </button>
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

export default ProfileVerifyOtp;