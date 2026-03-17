import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyEnquiryOtp, resetVerifyState } from "../../../redux/slice/enquiryform/verifyEnquirySlice";
import { Loader2 } from "lucide-react";

const EnquiryOtp = ({ phone, onClose, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.verifyEnquiry);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        dispatch(resetVerifyState());
        onClose();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [success,onClose, dispatch]);


  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 4) return;

    const cleanPhone = phone.split("-")[1] || phone;

    dispatch(verifyEnquiryOtp({ 
      phone: cleanPhone, 
      otp: finalOtp 
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/0 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-bold text-gray-800 mb-2">
          Enter OTP
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sent to <span className="text-orange-500 font-semibold">{phone}</span>
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={loading}
                className="w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all disabled:bg-gray-50"
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mb-6">
            Didn’t receive OTP?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-orange-500 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span>
                Resend in{" "}
                <span className="text-orange-500 font-semibold">{timer}s</span>
              </span>
            )}
          </p>

          <button
            type="submit"
            disabled={loading || otp.includes("")}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify"}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="w-full mt-4 text-sm text-gray-400 hover:text-orange-500 disabled:opacity-50"
          >
            ← Back to Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryOtp;