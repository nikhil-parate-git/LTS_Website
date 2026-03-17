// import React, { useState } from "react";
// // ── Inline SVG icons to match exact style ────────────────────────────────────
// const IconPhone = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//   </svg>
// );
// const IconUser = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );
// const IconFile = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//     <polyline points="10 9 9 9 8 9" />
//   </svg>
// );
// const IconMapPin = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#f97316"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );
// const IconMap = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
//     <line x1="8" y1="2" x2="8" y2="18" />
//     <line x1="16" y1="6" x2="16" y2="22" />
//   </svg>
// );
// const IconBriefcase = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
//     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//   </svg>
// );
// const IconCalendar = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//     <line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" />
//     <line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const IconClock = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );
// const IconWhatsApp = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
//   </svg>
// );
// const IconOpen = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#6b7280"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polyline points="12 6 12 12 16 14" />
//   </svg>
// );
// const IconChevronRight = () => (
//   <svg
//     width="12"
//     height="12"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#9ca3af"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="9 18 15 12 9 6" />
//   </svg>
// );
// const IconChevronDown = ({ rotate }) => (
//   <svg
//     width="12"
//     height="12"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     style={{
//       transform: rotate ? "rotate(180deg)" : "rotate(0deg)",
//       transition: "transform 0.2s",
//     }}
//   >
//     <polyline points="6 9 12 15 18 9" />
//   </svg>
// );

// // ─────────────────────────────────────────────────────────────────────────────

// const CatgInfoRightSideBar = () => {
//   const [form, setForm] = useState({ mobile: "", name: "", requirement: "" });
//   const [showMore, setShowMore] = useState(false);
//   const [showNumber, setShowNumber] = useState(false);

//   const listedUnder = [
//     "Travel Agents & Tour Operators",
//     "Air, Train & Bus Travel Agents",
//     "Local Travel Agents & Tour Operators",
//     "Foreign Travel Agents & Tour Operators",
//   ];

//   const infoRows = [
//     {
//       icon: <IconMap />,
//       content: (
//         <a href="#" className="text-xs text-blue-500 hover:underline">
//           View on Map
//         </a>
//       ),
//     },
//     {
//       icon: <IconBriefcase />,
//       content: (
//         <span className="text-xs text-gray-600">Type – Service Provider</span>
//       ),
//     },
//     {
//       icon: <IconCalendar />,
//       content: <span className="text-xs text-gray-600">Started In – 2008</span>,
//     },
//     {
//       icon: <IconOpen />,
//       content: <span className="text-xs text-gray-600">Open on : 24x7</span>,
//     },
//   ];

//   return (
//     <div className="w-full font-sans" style={{ fontSize: "13px" }}>
//       {/* ══ ENQUIRY CARD ══════════════════════════════════════════════════════ */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
//         {/* Title */}
//         <p className="text-sm font-normal text-gray-800 mb-3 leading-snug">
//           Connect with{" "}
//           <span className="font-bold text-orange-500">
//             Top Travel Agents &amp; Tour Operations
//           </span>{" "}
//           in Delhi
//         </p>

//         {/* Mobile */}
//         <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 mb-2 bg-white">
//           <span className="text-gray-400">
//             <IconPhone />
//           </span>
//           <input
//             type="tel"
//             placeholder="Enter your Mobile No."
//             value={form.mobile}
//             onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//             className="flex-1 text-xs text-gray-700 outline-none bg-transparent placeholder-gray-400"
//           />
//         </div>

//         {/* Name */}
//         <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 mb-2 bg-white">
//           <span className="text-gray-400">
//             <IconUser />
//           </span>
//           <input
//             type="text"
//             placeholder="Enter your Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="flex-1 text-xs text-gray-700 outline-none bg-transparent placeholder-gray-400"
//           />
//         </div>

//         {/* Requirement */}
//         <div className="relative border border-gray-300 rounded px-3 py-2 mb-3 bg-white">
//           <div className="flex items-start gap-2">
//             <span className="text-gray-400 mt-0.5">
//               <IconFile />
//             </span>
//             <textarea
//               placeholder="What is your Requirements"
//               value={form.requirement}
//               onChange={(e) =>
//                 setForm({ ...form, requirement: e.target.value.slice(0, 100) })
//               }
//               rows={4}
//               className="flex-1 text-xs text-gray-700 outline-none bg-transparent placeholder-gray-400 resize-none"
//             />
//           </div>
//           <span className="absolute bottom-2 right-2 text-xs text-gray-400">
//             {100 - form.requirement.length}
//           </span>
//         </div>

//         {/* Button */}
//         <button className="w-full py-2.5 bg-orange-500 hover:bg-blue-600 text-white font-semibold text-sm rounded transition-colors duration-200">
//           Send Enquiry
//         </button>
//       </div>

//       {/* ══ QUICK INFORMATION ════════════════════════════════════════════════ */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
//         <p className="text-sm font-bold text-gray-800 mb-3">
//           Quick Information
//         </p>

//         {/* Address row */}
//         <div className="flex items-start gap-2 mb-3">
//           <span className="mt-0.5 flex-shrink-0">
//             <IconMapPin />
//           </span>
//           <div>
//             <p className="text-xs font-semibold text-gray-800">
//               C-79/144 Arambagh
//             </p>
//             <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
//               Paharganj, New Delhi 110055
//               <br />
//               Area: Paharganj
//               <br />
//               City: Delhi
//             </p>
//           </div>
//         </div>

//         {/* Info rows */}
//         {infoRows.map((row, i) => (
//           <div key={i} className="flex items-center gap-2 mb-2.5">
//             <span className="flex-shrink-0">{row.icon}</span>
//             {row.content}
//           </div>
//         ))}

//         {/* Divider */}
//         <div className="border-t border-gray-100 my-3" />

//         {/* Working hours */}
//         <div className="flex items-center gap-2 mb-2.5">
//           <span className="flex-shrink-0">
//             <IconClock />
//           </span>
//           <span className="text-xs text-gray-600">
//             Working Hours: 10:00 AM to 10:00 PM
//           </span>
//         </div>

//         {/* Contact */}
//         <div className="flex items-center gap-2 mb-2.5">
//           <span className="flex-shrink-0">
//             <IconUser />
//           </span>
//           <span className="text-xs text-gray-600">
//             Contact : 5 S Rana Tour And Travels
//           </span>
//         </div>

//         {/* Phone masked */}
//         <div className="flex items-center gap-2 mb-3">
//           <span className="flex-shrink-0 text-gray-500">
//             <IconPhone />
//           </span>
//           <span className="text-xs font-medium text-gray-700 tracking-wide">
//             {showNumber ? "9990022994" : "97XXXXXXX8"}
//           </span>
//         </div>

//         {/* Show Numbers */}
//         <button
//           onClick={() => setShowNumber(!showNumber)}
//           className="w-full py-2 bg-blue-600 hover:bg-orange-500 text-white font-semibold text-xs rounded flex items-center justify-center gap-1.5 transition-colors duration-200 mb-2"
//         >
//           <span className="text-white">
//             <IconPhone />
//           </span>
//           {showNumber ? "Hide Number" : "Show Numbers"}
//         </button>

//         {/* WhatsApp */}
//         <button className="w-full py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-xs rounded flex items-center justify-center gap-1.5 transition-colors duration-200 mb-3">
//           <span className="text-green-500">
//             <IconWhatsApp />
//           </span>
//           Chat on WhatsApp
//         </button>

//         {/* GSTIN */}
//         <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
//           <span className="text-gray-400">
//             <IconFile />
//           </span>
//           <span className="text-xs text-gray-500">GSTN : 07GOAPES220042ZV</span>
//         </div>
//       </div>

//       {/* ══ LISTED UNDER ════════════════════════════════════════════════════ */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
//         <p className="text-sm font-bold text-gray-800 mb-3">Listed Under</p>

//         <ul className="space-y-2">
//           {(showMore ? listedUnder : listedUnder.slice(0, 3)).map((item, i) => (
//             <li
//               key={i}
//               className="flex items-center gap-1.5 cursor-pointer group"
//             >
//               <span className="flex-shrink-0">
//                 <IconChevronRight />
//               </span>
//               <span className="text-xs text-blue-500 group-hover:underline">
//                 {item}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <button
//           onClick={() => setShowMore(!showMore)}
//           className="mt-3 flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium"
//         >
//           {showMore ? "Show Less" : "Show More"}
//           <IconChevronDown rotate={showMore} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CatgInfoRightSideBar;








import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEnquiryOtp, resetEnquiryState } from "../../../redux/slice/enquiryform/enquirySentOtpSlice";
import EnquiryOtp from "./EnquiryOtp"; 

// ─── ICONS (Inline SVGs) ───────────────────────────────────────────────────
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);
const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
);
const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconWhatsApp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
);
const IconChevronDown = ({ rotate }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: rotate ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><polyline points="6 9 12 15 18 9" /></svg>
);
const IconChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
const CatgInfoRightSideBar = ({ vendorData }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ mobile: "", name: "", requirement: "" });
  const [showMore, setShowMore] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  const { loading, success } = useSelector((state) => state.enquiryOtp);
  useEffect(() => {
    if (success) setShowOtp(true);
  }, [success]);

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    if (!form.mobile || !form.name || !form.requirement) return;

    dispatch(sendEnquiryOtp({
      name: form.name,
      phone: form.mobile,
      enquiry: form.requirement,
      // categoryId: vendorData?.categoryId || null,
      // subcategoryId: vendorData?.subcategoryId || null,
      categoryId: vendorData?.category?.id || null,

    // API Response: data.subcategories (Array) ka pehla element
    subcategoryId: vendorData?.subcategories?.[0]?.id || null,
      vendorId: vendorData?.id || vendorData?._id || null 
    }));
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

  const listedUnder = vendorData?.subcategories || ["Service Provider", "Local Business"];

  return (
    <div className="w-full font-sans" style={{ fontSize: "13px" }}>
      {/* ══ ENQUIRY CARD ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
        {showOtp ? (
          <EnquiryOtp phone={form.mobile} onClose={handleOtpClose} onBack={handleOtpBack} />
        ) : (
          <>
            <p className="text-sm font-normal text-gray-800 mb-3 leading-snug">
              Connect with <span className="font-bold text-orange-500">
                {vendorData?.companyName || "Top Vendors"}
              </span> in {vendorData?.address?.city || "your city"}
            </p>

            <form onSubmit={handleSendEnquiry} className="space-y-2">
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <span className="text-gray-400"><IconPhone /></span>
                <input
                  type="tel"
                  placeholder="Enter Mobile No."
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })}
                  className="flex-1 text-xs outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                <span className="text-gray-400"><IconUser /></span>
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
                  <span className="text-gray-400 mt-0.5"><IconFile /></span>
                  <textarea
                    placeholder="Requirement details..."
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value.slice(0, 100) })}
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
                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold text-sm rounded transition-all"
              >
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* ══ QUICK INFORMATION ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-3">
        <p className="text-sm font-bold text-gray-800 mb-3">Quick Information</p>
        
        <div className="flex items-start gap-2 mb-3">
          <span className="mt-0.5"><IconMapPin /></span>
          <div>
            <p className="text-xs font-semibold text-gray-800">{vendorData?.companyName}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {vendorData?.address?.area}, {vendorData?.address?.city} {vendorData?.address?.pincode}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <IconBriefcase /> <span className="text-xs text-gray-600">Established: {vendorData?.yearOfEstablishment || "2024"}</span>
          </div>
          <div className="flex items-center gap-2">
            <IconClock /> <span className="text-xs text-gray-600">Hours: {vendorData?.openingTime || "9:00 AM - 9:00 PM"}</span>
          </div>
          <div className="flex items-center gap-2">
            <IconPhone /> 
            <span className="text-xs font-medium text-gray-700">
              {showNumber ? vendorData?.phone : "97XXXXXXX8"}
            </span>
          </div>
        </div>

        <button 
          onClick={() => setShowNumber(!showNumber)}
          className="w-full mt-4 py-2 bg-blue-600 hover:bg-orange-500 text-white font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
        >
          <IconPhone /> {showNumber ? "Hide Number" : "Show Numbers"}
        </button>

        <button className="w-full mt-2 py-2 border border-gray-300 text-gray-700 font-medium text-xs rounded flex items-center justify-center gap-2">
          <span className="text-green-500"><IconWhatsApp /></span> Chat on WhatsApp
        </button>
      </div>

      {/* ══ LISTED UNDER ══ */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Listed Under</p>
        <ul className="space-y-2">
          {(showMore ? listedUnder : listedUnder.slice(0, 3)).map((item, i) => (
            <li key={i} className="flex items-center gap-1.5 cursor-pointer group">
              <IconChevronRight />
              <span className="text-xs text-blue-500 group-hover:underline">
                {typeof item === 'object' ? item.name : item}
              </span>
            </li>
          ))}
        </ul>
        {listedUnder.length > 3 && (
          <button onClick={() => setShowMore(!showMore)} className="mt-3 flex items-center gap-1 text-xs text-blue-500 font-medium">
            {showMore ? "Show Less" : "Show More"} <IconChevronDown rotate={showMore} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CatgInfoRightSideBar;