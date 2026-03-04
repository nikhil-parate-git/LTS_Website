import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EnquiryOtp from "./EnquiryOtp";

const countryCodes = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
];

// ─── Universal usage ───────────────────────────────────────────────
// 1. As modal with isOpen prop (anywhere in app):
//    <SubmitEnquiry isOpen={showModal} onClose={() => setShowModal(false)} />
//
// 2. As a Route (no props needed — closes via navigate(-1)):
//    <Route path="/submitenquiry" element={<SubmitEnquiry />} />
//
// 3. Legacy (auto-open after 2s delay):
//    <SubmitEnquiry onClose={() => setShowModal(false)} />
// ──────────────────────────────────────────────────────────────────

const SubmitEnquiry = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showOtp, setShowOtp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  // ── Detect if opened as a standalone route (no onClose prop) ──
  const isRoutePage = isOpen === undefined && onClose === undefined;

  // ── Unified close handler ──
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (isRoutePage) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (isRoutePage) {
      // Route mode: show immediately
      setVisible(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
    } else if (isOpen !== undefined) {
      // Controlled mode
      if (isOpen) {
        setVisible(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true)),
        );
      } else {
        setAnimate(false);
        const t = setTimeout(() => setVisible(false), 450);
        return () => clearTimeout(t);
      }
    } else {
      // Legacy mode: 2s delay
      const showTimer = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true)),
        );
      }, 2000);
      return () => clearTimeout(showTimer);
    }
  }, [isOpen, isRoutePage]);

  // ── Body scroll lock — only when used as modal (not route) ──
  useEffect(() => {
    if (!visible || isRoutePage) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [visible, isRoutePage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOtp(true);
  };

  if (showOtp) {
    return (
      <EnquiryOtp
        phone={`${countryCode}-${phone}`}
        onClose={handleClose}
        onBack={() => setShowOtp(false)}
      />
    );
  }

  if (!visible) return null;

  // ── Route mode: render as full page (no fixed overlay) ──
  if (isRoutePage) {
    return (
      <>
        <style>{`
          .enquiry-modal {
            opacity: 0;
            transform: translateY(-40px);
            transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .enquiry-modal.show {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>

        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12">
          <div
            className={`enquiry-modal relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 ${animate ? "show" : ""}`}
          >
            {/* Close / Back Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-lg font-bold"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl font-bold text-orange-500 mb-7">
              Submit Your Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Contact Number
                </label>
                <div className="flex w-full rounded-xl bg-blue-50 border border-transparent focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all duration-200 overflow-hidden">
                  <div className="flex items-center pl-3 pr-1 flex-shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer py-3 appearance-none"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="w-3.5 h-3.5 text-gray-400 ml-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <div className="w-px bg-gray-200 my-3" />
                  <input
                    type="tel"
                    placeholder="Enter Contact Number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength={12}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 py-3 pr-4 pl-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Your Enquiry
                </label>
                <textarea
                  placeholder="Describe your issue..."
                  value={enquiry}
                  onChange={(e) => setEnquiry(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 text-base tracking-wide"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // ── Modal mode: fixed overlay ──
  return (
    <>
      <style>{`
        .enquiry-backdrop {
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .enquiry-backdrop.show { opacity: 1; }
        .enquiry-modal {
          opacity: 0;
          transform: translateY(-130px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .enquiry-modal.show { opacity: 1; transform: translateY(0); }
      `}</style>

      <div
        className={`enquiry-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-10 pb-6 ${animate ? "show" : ""}`}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div
          className={`enquiry-modal relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 mb-8 ${animate ? "show" : ""}`}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-lg font-bold"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-center text-2xl font-bold text-orange-500 mb-7">
            Submit Your Enquiry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Contact Number
              </label>
              <div className="flex w-full rounded-xl bg-blue-50 border border-transparent focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all duration-200 overflow-hidden">
                <div className="flex items-center pl-3 pr-1 flex-shrink-0">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer py-3 appearance-none"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 ml-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="w-px bg-gray-200 my-3" />
                <input
                  type="tel"
                  placeholder="Enter Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  maxLength={12}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 py-3 pr-4 pl-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Your Enquiry
              </label>
              <textarea
                placeholder="Describe your issue..."
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 text-base tracking-wide"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitEnquiry;
