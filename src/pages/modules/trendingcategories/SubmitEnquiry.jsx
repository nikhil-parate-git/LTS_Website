import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import {
  sendEnquiryOtp,
  resetEnquiryState,
} from "../../../redux/slice/enquiryform/enquirySentOtpSlice";
import EnquiryOtp from "./EnquiryOtp";

const countryCodes = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+971", flag: "🇦🇪" },
];

const SubmitEnquiry = ({ isOpen, onClose, categoryId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showOtp, setShowOtp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { loading, success } = useSelector((state) => state.enquiryOtp);
  const isRoutePage = isOpen === undefined && onClose === undefined;

  // ✅ FIXED: sessionStorage fallback
  const savedMeta = JSON.parse(sessionStorage.getItem("enquiryMeta") || "{}");
  const venIdFromState = location.state?.venId || savedMeta.venId || null;
  const catIdFromState = location.state?.catId || savedMeta.catId || null;
  const subCateIdFromState =
    location.state?.subCateId || savedMeta.subCateId || null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      dispatch(resetEnquiryState());
      sessionStorage.removeItem("enquiryMeta"); // ✅ cleanup
      if (onClose) {
        onClose();
      } else if (isRoutePage) navigate(-1);
      else setVisible(false);
    }, 400);
  };

  useEffect(() => {
    if (success) setShowOtp(true);
  }, [success]);

  useEffect(() => {
    let timer;
    if (isRoutePage) {
      setVisible(true);
      timer = setTimeout(() => setAnimate(true), 100);
    } else if (isOpen !== undefined && isOpen === true) {
      setVisible(true);
      timer = setTimeout(() => setAnimate(true), 100);
    } else if (isOpen === false) {
      setAnimate(false);
      timer = setTimeout(() => setVisible(false), 450);
    } else {
      timer = setTimeout(() => {
        setVisible(true);
        setTimeout(() => setAnimate(true), 100);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isRoutePage]);

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
    if (!name || !phone || !enquiry) return;
    dispatch(
      sendEnquiryOtp({
        name,
        phone: `${phone}`,
        enquiry,
        vendorId: venIdFromState || null,
        categoryId: catIdFromState || null,
        subcategoryId: subCateIdFromState || null,
      }),
    );
  };

  if (showOtp) {
    return (
      <EnquiryOtp
        phone={`${countryCode}-${phone}`}
        onClose={handleClose}
        onBack={() => {
          setShowOtp(false);
          dispatch(resetEnquiryState());
        }}
      />
    );
  }

  if (!visible) return null;

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="enquiry-name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Customer Name
        </label>
        <input
          id="enquiry-name"
          type="text"
          required
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200"
        />
      </div>

      <div>
        <label
          htmlFor="enquiry-phone"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Customer Contact Number
        </label>
        <div className="flex w-full rounded-xl bg-blue-50 border border-transparent focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100 transition-all duration-200 overflow-hidden">
          <div className="flex items-center pl-3 pr-1 flex-shrink-0">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              aria-label="Country code"
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
              aria-hidden="true"
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
            id="enquiry-phone"
            type="tel"
            required
            placeholder="Enter Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={12}
            autoComplete="tel"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 py-3 pr-4 pl-3"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry-message"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Enter Your Enquiry
        </label>
        <textarea
          id="enquiry-message"
          required
          placeholder="Describe your issue..."
          value={enquiry}
          onChange={(e) => setEnquiry(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-transparent focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 text-base tracking-wide flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Send Enquiry"
        )}
      </button>
    </form>
  );

  if (isRoutePage) {
    return (
      <>
        <style>{`
          .enquiry-modal { opacity: 0; transform: translateY(-40px); transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1); }
          .enquiry-modal.show { opacity: 1; transform: translateY(0); }
        `}</style>
        <main className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12">
          <div
            className={`enquiry-modal relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 ${animate ? "show" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
          >
            <button
              onClick={handleClose}
              className="absolute cursor-pointer top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-lg font-bold"
              aria-label="Close enquiry form"
            >
              ✕
            </button>
            <h1
              id="enquiry-title"
              className="text-center text-2xl font-bold text-orange-500 mb-7"
            >
              Submit Your Enquiry
            </h1>
            {formContent}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{`
        .enquiry-backdrop { opacity: 0; transition: opacity 0.45s ease; }
        .enquiry-backdrop.show { opacity: 1; }
        .enquiry-modal { opacity: 0; transform: translateY(-130px); transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .enquiry-modal.show { opacity: 1; transform: translateY(0); }
      `}</style>
      <div
        className={`enquiry-backdrop fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-4 pt-10 pb-6 ${animate ? "show" : ""}`}
        onClick={(e) => e.target === e.currentTarget && handleClose()}
        role="presentation"
      >
        <div
          className={`enquiry-modal relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 mb-8 ${animate ? "show" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 text-lg font-bold"
            aria-label="Close enquiry form"
          >
            ✕
          </button>
          <h2
            id="enquiry-title"
            className="text-center text-2xl font-bold text-orange-500 mb-7"
          >
            Submit Your Enquiry
          </h2>
          {formContent}
        </div>
      </div>
    </>
  );
};

export default SubmitEnquiry;
