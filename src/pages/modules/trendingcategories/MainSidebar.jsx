// import React, { useState, useEffect } from "react";
// import { ChevronRight, MapPin, TrendingUp, Users, Loader2 } from "lucide-react"; // Note: lucide-react correctly
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import {
//   sendEnquiryOtp,
//   resetEnquiryState,
// } from "../../../redux/slice/enquiryform/enquirySentOtpSlice";
// import EnquiryOtp from "./EnquiryOtp";

// const popularCategories = [
//   "Air & Bus Ticket Agents",
//   "Local Travel Agents & Tour Operators",
//   "Domestic Travel Agents",
//   "International Travel Agents",
//   "Holiday Package Dealers",
// ];

// const nearbyAreas = [
//   { name: "All of CA", count: 14122 },
//   { name: "Delhi NCR", count: 73200 },
//   { name: "Mumbai", count: 41600 },
//   { name: "Ajmer Gate", count: 11000 },
// ];

// export default function Sidebar({ cityName, vendorData }) {
//   // 1. Route ke according IDs fetch karein
//   const { categoryId, subcategoryId, slug } = useParams();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     enquiry: "",
//   });
//   const [showOtp, setShowOtp] = useState(false);

//   const { loading, success } = useSelector((state) => state.enquiryOtp);

//   useEffect(() => {
//     if (success) {
//       setShowOtp(true);
//     }
//   }, [success]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSendEnquiry = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone || !formData.enquiry) return;

//     // 2. Payload mein dono IDs include karein
//     dispatch(
//       sendEnquiryOtp({
//         name: formData.name,
//         phone: formData.phone,
//         enquiry: formData.enquiry,
//         vendorId: vendorData?.id || null,
//         categoryId: categoryId || slug,
//         // categoryId: vendorData?.category?.id || null,
//         subcategoryId: subcategoryId || null, // Add subcategoryId if present in route
//       }),
//     );
//   };

//   const handleOtpBack = () => {
//     setShowOtp(false);
//     dispatch(resetEnquiryState());
//   };

//   const handleOtpClose = () => {
//     setShowOtp(false);
//     setFormData({ name: "", phone: "", enquiry: "" });
//     dispatch(resetEnquiryState());
//   };

//   return (
//     <div className="space-y-5">
//       {/* ── Enquiry Section ── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-3">
//           <p className="text-white font-bold text-sm">
//             Connect with Top Agents
//           </p>
//           <p className="text-orange-100 text-xs mt-0.5">
//             & Tour Operators in <span className="font-bold">{cityName}</span>
//           </p>
//         </div>

//         <div className="p-4">
//           {showOtp ? (
//             <div className="py-2">
//               <EnquiryOtp
//                 phone={formData.phone}
//                 onClose={handleOtpClose}
//                 onBack={handleOtpBack}
//               />
//             </div>
//           ) : (
//             <form onSubmit={handleSendEnquiry} className="space-y-2.5">
//               <input
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     phone: e.target.value.replace(/\D/g, ""),
//                   })
//                 }
//                 placeholder="Enter your Mobile No."
//                 maxLength={10}
//                 required
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
//               />
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your Name"
//                 required
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
//               />
//               <textarea
//                 name="enquiry"
//                 value={formData.enquiry}
//                 onChange={handleInputChange}
//                 placeholder="What is your Requirements"
//                 rows={3}
//                 required
//                 className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-200 hover:scale-[1.02] flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin" size={18} />
//                 ) : (
//                   "Send Enquiry"
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* ── Popular Categories ── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//         <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
//           <TrendingUp size={14} className="text-orange-500" /> Popular Category
//         </h3>
//         <div className="space-y-1.5">
//           {popularCategories.map((cat, i) => (
//             <button
//               key={i}
//               className="w-full text-left text-xs text-blue-600 hover:text-orange-500 hover:bg-orange-50 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2"
//             >
//               <ChevronRight size={11} className="text-orange-400" /> {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ... Baki UI components same rahenge ... */}
//       {/* ── Add Business CTA ── */}
//       <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4">
//         <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
//           <Users size={13} className="text-blue-500" />
//           Are you a Travel Agent?
//         </p>
//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
//           Add your Business Listings
//         </button>
//       </div>

//       {/* ── Nearby Areas ── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//         <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
//           <MapPin size={14} className="text-orange-500" /> Nearby Areas
//         </h3>
//         <div className="space-y-1.5">
//           {nearbyAreas.map((area, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors"
//             >
//               <span className="text-blue-600 group-hover:text-orange-500 font-medium">
//                 {area.name}
//               </span>
//               <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                 {area.count.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { ChevronRight, MapPin, TrendingUp, Users, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendEnquiryOtp,
  resetEnquiryState,
} from "../../../redux/slice/enquiryform/enquirySentOtpSlice";
import EnquiryOtp from "./EnquiryOtp";

const popularCategories = [
  "Air & Bus Ticket Agents",
  "Local Travel Agents & Tour Operators",
  "Domestic Travel Agents",
  "International Travel Agents",
  "Holiday Package Dealers",
];

const nearbyAreas = [
  { name: "All of CA",   count: 14122 },
  { name: "Delhi NCR",   count: 73200 },
  { name: "Mumbai",      count: 41600 },
  { name: "Ajmer Gate",  count: 11000 },
];

export default function Sidebar({ cityName, vendorData, categoryId, subcategoryId }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: "", phone: "", enquiry: "" });
  const [showOtp, setShowOtp]   = useState(false);

  const { loading, success } = useSelector((state) => state.enquiryOtp);

  useEffect(() => {
    if (success) setShowOtp(true);
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FIXED: categoryId aur subcategoryId props se lo
  const handleSendEnquiry = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.enquiry) return;
    dispatch(
      sendEnquiryOtp({
        name:          formData.name,
        phone:         formData.phone,
        enquiry:       formData.enquiry,
        vendorId:      vendorData?.venId || null,      // ✅ venId string
        categoryId:    categoryId        || null,      // ✅ props se — "CAT-010"
        subcategoryId: subcategoryId     || null,      // ✅ props se — "SUBCAT-153"
      }),
    );
  };

  const handleOtpBack  = () => { setShowOtp(false); dispatch(resetEnquiryState()); };
  const handleOtpClose = () => { setShowOtp(false); setFormData({ name: "", phone: "", enquiry: "" }); dispatch(resetEnquiryState()); };

  return (
    <div className="space-y-5">
      {/* ── Enquiry Section ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-3">
          <p className="text-white font-bold text-sm">Connect with Top Agents</p>
          <p className="text-orange-100 text-xs mt-0.5">
            & Tour Operators in <span className="font-bold">{cityName}</span>
          </p>
        </div>

        <div className="p-4">
          {showOtp ? (
            <div className="py-2">
              <EnquiryOtp
                phone={formData.phone}
                onClose={handleOtpClose}
                onBack={handleOtpBack}
              />
            </div>
          ) : (
            <form onSubmit={handleSendEnquiry} className="space-y-2.5">
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                placeholder="Enter your Mobile No."
                maxLength={10}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
              />
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your Name"
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
              />
              <textarea
                name="enquiry"
                value={formData.enquiry}
                onChange={handleInputChange}
                placeholder="What is your Requirements"
                rows={3}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-200 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Popular Categories ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-orange-500" /> Popular Category
        </h3>
        <div className="space-y-1.5">
          {popularCategories.map((cat, i) => (
            <button
              key={i}
              className="w-full text-left text-xs text-blue-600 hover:text-orange-500 hover:bg-orange-50 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronRight size={11} className="text-orange-400" /> {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Add Business CTA ── */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4">
        <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
          <Users size={13} className="text-blue-500" />
          Are you a Travel Agent?
        </p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
          Add your Business Listings
        </button>
      </div>

      {/* ── Nearby Areas ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-orange-500" /> Nearby Areas
        </h3>
        <div className="space-y-1.5">
          {nearbyAreas.map((area, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors"
            >
              <span className="text-blue-600 group-hover:text-orange-500 font-medium">{area.name}</span>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{area.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}