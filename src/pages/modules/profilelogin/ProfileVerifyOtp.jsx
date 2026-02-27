import React, { useEffect } from "react";
import { X } from "lucide-react";

const ProfileVerifyOtp = ({ phone = "8998786844", onClose }) => {
  // 🔒 Scroll lock
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
      {/* Modal */}
      <div
        className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10"
        style={{ animation: "slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-200 hover:rotate-90"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Heading */}
        <h2 className="text-center text-base sm:text-lg font-bold text-gray-900 leading-snug mb-7 px-2">
          Enter 4-digit OTP sent on{" "}
          <span className="whitespace-nowrap">+91-{phone}</span>
        </h2>

        {/* OTP Boxes - Static */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-5">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-gray-200 bg-white"
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mb-6">
          Didn't receive OTP?{" "}
          <span className="text-gray-400">Resend SMS in 60 sec</span>
        </p>

        {/* Verify Button */}
        <button
          className="w-full h-12 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg active:scale-95"
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            boxShadow: "0 4px 14px rgba(234,88,12,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #2563eb, #1d4ed8)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #f97316, #ea580c)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(234,88,12,0.35)";
          }}
        >
          Verify
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
