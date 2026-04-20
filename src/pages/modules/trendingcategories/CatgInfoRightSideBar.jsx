import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendEnquiryOtp,
  resetEnquiryState,
} from "../../../redux/slice/enquiryform/enquirySentOtpSlice";
import EnquiryOtp from "./EnquiryOtp";

// ─── ICONS ────────────────────────────────────────────────────────────────
const IconPhone = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconUser = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconFile = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6b7280"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconChevronDown = ({ rotate }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconChevronRight = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
const CatgInfoRightSideBar = ({ vendorData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: "", name: "", requirement: "" });
  const [showMore, setShowMore] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const { loading, success } = useSelector((state) => state.enquiryOtp);

  useEffect(() => {
    if (success) setShowOtp(true);
  }, [success]);

  // ✅ FIXED: venId string bhejo — backend ab accept karta hai
  const handleSendEnquiry = (e) => {
    e.preventDefault();
    if (!form.mobile || !form.name || !form.requirement) return;

    dispatch(
      sendEnquiryOtp({
        name: form.name,
        phone: form.mobile,
        enquiry: form.requirement,
        vendorId: vendorData?.venId || null, // ✅ "VEN-274" string
        categoryId: vendorData?.categoryId || null, // ✅ "CAT-010" string
        subcategoryId: vendorData?.subcategoryIds?.[0] || null, // ✅ "SUBCAT-153" string
      }),
    );
  };

  const handleOtpClose = () => {
    setShowOtp(false);
    setForm({ mobile: "", name: "", requirement: "" });
    dispatch(resetEnquiryState());
  };

  const handleOtpBack = () => {
    setShowOtp(false);
    dispatch(resetEnquiryState());
  };

  // ✅ FIXED: catId aur subCateId ke saath navigate karo
  const handleShowNumberClick = () => {
    const meta = {
      venId: vendorData?.venId || null,
      catId: vendorData?.categoryId || null,
      subCateId: vendorData?.subcategoryIds?.[0] || null,
    };
    sessionStorage.setItem("enquiryMeta", JSON.stringify(meta));
    navigate(
      `/submitenquiry/${vendorData?.categoryId || "cat"}/${vendorData?.subcategoryIds?.[0] || "subcat"}`,
      { state: meta },
    );
  };

  const listedUnder = vendorData?.subcategories || [
    "Service Provider",
    "Local Business",
  ];

  return (
    <div className="w-full font-sans" style={{ fontSize: "13px" }}>
      {/* ══ ENQUIRY CARD ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
        {showOtp ? (
          <EnquiryOtp
            phone={form.mobile}
            onClose={handleOtpClose}
            onBack={handleOtpBack}
          />
        ) : (
          <>
            <p className="text-sm font-normal text-gray-800 mb-3 leading-snug">
              Connect with{" "}
              <span className="font-bold text-orange-500">
                {vendorData?.companyName || "Top Vendors"}
              </span>{" "}
              in {vendorData?.address?.city || "your city"}
            </p>

            <form onSubmit={handleSendEnquiry} className="space-y-2">
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <span className="text-gray-400">
                  <IconPhone />
                </span>
                <input
                  type="tel"
                  placeholder="Enter Mobile No."
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mobile: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="flex-1 text-xs outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <span className="text-gray-400">
                  <IconUser />
                </span>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex-1 text-xs outline-none bg-transparent"
                />
              </div>

              <div className="relative border border-gray-300 rounded px-3 py-2 bg-white">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">
                    <IconFile />
                  </span>
                  <textarea
                    placeholder="Requirement details..."
                    value={form.requirement}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        requirement: e.target.value.slice(0, 100),
                      })
                    }
                    rows={3}
                    className="flex-1 text-xs outline-none bg-transparent resize-none"
                  />
                </div>
                <span className="absolute bottom-1 right-2 text-[9px] text-gray-400">
                  {100 - form.requirement.length}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold text-sm rounded transition-all"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ══ QUICK INFORMATION ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
        <p className="text-sm font-bold text-gray-800 mb-3">
          Quick Information
        </p>

        <div className="flex items-start gap-2 mb-3">
          <span className="mt-0.5">
            <IconMapPin />
          </span>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {vendorData?.companyName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {vendorData?.address?.area}, {vendorData?.address?.city}{" "}
              {vendorData?.address?.pincode}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <IconClock />
            <span className="text-xs text-gray-600">
              Hours: {vendorData?.openingTime || "9:00 AM - 9:00 PM"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconPhone />
            <span className="text-xs font-medium text-gray-700">
              97XXXXXXX8
            </span>
          </div>
        </div>

        {/* ✅ FIXED: catId/subCateId ke saath navigate */}
        <button
          onClick={handleShowNumberClick}
          className="w-full cursor-pointer mt-4 py-2 bg-blue-600 hover:bg-orange-500 text-white font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
        >
          <IconPhone /> Show Numbers
        </button>
      </div>

      {/* ══ LISTED UNDER ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Listed Under</p>
        <ul className="space-y-2">
          {(showMore ? listedUnder : listedUnder.slice(0, 3)).map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <IconChevronRight />
              <span className="text-xs text-blue-500 group-hover:underline">
                {typeof item === "object" ? item.name : item}
              </span>
            </li>
          ))}
        </ul>
        {listedUnder.length > 3 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-3 flex items-center gap-1 text-xs text-blue-500 font-medium"
          >
            {showMore ? "Show Less" : "Show More"}{" "}
            <IconChevronDown rotate={showMore} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CatgInfoRightSideBar;
