// import { useState, useEffect, useRef, useCallback, memo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchVendorsByCatAndSubcat,
//   fetchSubCategoryBanners,
//   clearVendors,
// } from "../../../redux/slice/category/getVendorByCatandSubcat";
// import {
//   ChevronRight,
//   MapPin,
//   Phone,
//   Eye,
//   ChevronDown,
//   SlidersHorizontal,
//   BadgeCheck,
//   Clock,
//   Zap,
//   Share2,
//   ArrowLeft,
//   X,
//   Search,
//   Loader2,
// } from "lucide-react";
// import Sidebar from "./MainSidebar";
// import Banner from "./Acbanner/Banner";
// import { SEO } from "../../../hooks/useSEO";

// const createSlug = (title = "") =>
//   title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// function formatProfileCount(n) {
//   if (!n) return "0";
//   if (n >= 1000) {
//     const val = n / 1000;
//     return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
//   }
//   return String(n);
// }

// // ─── FilterOverlay ─────────────────────────────────────────────────────────────
// function FilterOverlay({ open, onClose }) {
//   if (!open) return null;
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-5">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-gray-800">Filters</h2>
//             <X
//               onClick={onClose}
//               className="cursor-pointer text-gray-500"
//               size={18}
//             />
//           </div>
//           <button
//             onClick={onClose}
//             className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── BusinessCard ──────────────────────────────────────────────────────────────
// const getTickColorClass = (color) => {
//   switch (color?.toLowerCase()) {
//     case "red":
//       return "text-red-500";
//     case "blue":
//       return "text-blue-500";
//     case "green":
//       return "text-green-500";
//     case "gold":
//     case "yellow":
//       return "text-yellow-500";
//     default:
//       return "text-blue-500";
//   }
// };

// const BusinessCard = memo(function BusinessCard({ biz }) {
//   const [showNumber, setShowNumber] = useState(false);
//   const [showAllTags, setShowAllTags] = useState(false);
//   const navigate = useNavigate();

//   const VISIBLE = 2;
//   const tags = Array.isArray(biz.subcategories) ? biz.subcategories : [];
//   const visibleTags = showAllTags ? tags : tags.slice(0, VISIBLE);
//   const hasMore = tags.length > VISIBLE;

//   const handleBusinessClick = useCallback(() => {
//     const { venId, companyName, vendorName, address } = biz;
//     if (!venId) return;
//     const slug = createSlug(companyName || vendorName || "business");
//     const citySlug = createSlug(
//       (typeof address === "object" ? address?.city : "") || "india",
//     );
//     navigate(`/business/${citySlug}/${venId}/${slug}`);
//   }, [biz, navigate]);

//   return (
//     <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
//       <div className="flex flex-col sm:flex-row">
//         <div
//           className="relative w-full sm:w-56 shrink-0"
//           style={{ minHeight: "180px" }}
//         >
//           <img
//             src={
//               biz.image ||
//               "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80"
//             }
//             alt={biz.name}
//             loading="lazy"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute top-2.5 right-2.5 bg-white/90 text-gray-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
//             Since {biz.since}
//           </div>
//         </div>

//         <div className="flex-1 p-4 flex flex-col gap-2">
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-1.5 flex-wrap">
//               <h3
//                 onClick={handleBusinessClick}
//                 className="text-base font-bold text-blue-700 hover:underline cursor-pointer"
//               >
//                 {biz.name}
//               </h3>
//               {biz.verified && (
//                 <BadgeCheck
//                   size={18}
//                   className={`${getTickColorClass(biz.tickColour)} shrink-0`}
//                 />
//               )}
//             </div>
//             <button
//               aria-label="Share"
//               className="text-gray-400 hover:text-orange-500"
//             >
//               <Share2 size={14} />
//             </button>
//           </div>

//           <div className="flex items-start gap-1.5 text-gray-500 text-xs">
//             <MapPin size={12} className="mt-0.5 text-orange-500 shrink-0" />
//             <span>
//               {typeof biz.address === "object"
//                 ? biz.address?.city || "Location not provided"
//                 : biz.address || "Location not provided"}
//             </span>
//           </div>

//           <div className="flex flex-wrap gap-1.5 items-center">
//             {visibleTags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="text-[11px] border border-gray-300 text-gray-700 px-2.5 py-1 rounded-full bg-white font-medium"
//               >
//                 {typeof tag === "object" ? tag.name : tag}
//               </span>
//             ))}
//             {!showAllTags && hasMore && (
//               <button
//                 onClick={() => setShowAllTags(true)}
//                 className="text-[11px] text-blue-600 font-semibold hover:underline"
//               >
//                 See More
//               </button>
//             )}
//           </div>

//           <div className="flex items-center gap-1 text-xs text-gray-500">
//             <Clock size={11} />
//             <span>Open: {biz.hours || "9:00 AM - 9:00 PM"}</span>
//           </div>

//           <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowNumber(!showNumber)}
//                 className={`flex items-center justify-center gap-2 min-w-[140px] px-4 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${
//                   showNumber
//                     ? "bg-green-600 text-white shadow-inner"
//                     : "bg-orange-500 text-white hover:bg-orange-600"
//                 }`}
//               >
//                 {showNumber ? (
//                   <>
//                     <Phone size={13} className="animate-pulse" />
//                     <span className="tracking-wider">{biz.phone || "N/A"}</span>
//                   </>
//                 ) : (
//                   <>
//                     <Phone size={13} />
//                     <span>Show Number</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// });

// // ─── CategoryDetails ───────────────────────────────────────────────────────────
// export default function CategoryDetails() {
//   const { catId, subCateId, city, subcategorySlug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("Relevance");

//   const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
//     useSelector((state) => state.vendorStore);

//   const selectedCity = useSelector((state) => state.location.selectedCity);

//   const cityFromUrl =
//     city?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "";

//   // Active city = Redux selectedCity (if set) else URL city
//   const activeCity = selectedCity || cityFromUrl;

//   const lastFetchKeyRef = useRef("");

//   useEffect(() => {
//     if (!catId || !subCateId) return;

//     // ✅ activeCity in key — any city change triggers re-fetch
//     const fetchKey = `${catId}-${subCateId}-${activeCity}`;
//     if (lastFetchKeyRef.current === fetchKey) return;
//     lastFetchKeyRef.current = fetchKey;

//     dispatch(clearVendors());

//     dispatch(
//       fetchVendorsByCatAndSubcat({
//         cateId: catId,
//         subCateId,
//         city: activeCity, // ✅ "Nagpur", "Aurangabad" etc.
//       }),
//     );

//     dispatch(fetchSubCategoryBanners({ cateId: catId, subCateId }));
//   }, [catId, subCateId, activeCity, dispatch]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(clearVendors());
//       lastFetchKeyRef.current = "";
//     };
//   }, [dispatch]);

//   const closeFilter = useCallback(() => setFilterOpen(false), []);

//   const pageTitle =
//     subcategoryName ||
//     subcategorySlug
//       ?.replace(/-/g, " ")
//       .replace(/\b\w/g, (c) => c.toUpperCase()) ||
//     "Services";

//   const cityLabel = activeCity || "India";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SEO
//         title={`${pageTitle} in ${cityLabel} | LocalTradeStreet`}
//         description={`Find top-rated ${pageTitle} providers in ${cityLabel}. Compare verified vendors, view ratings, and get instant quotes on LocalTradeStreet.`}

//         ogType="website"
//       />

//       <FilterOverlay open={filterOpen} onClose={closeFilter} />
//       <Banner
//         banners={banners}
//         loading={bannerLoading}
//         pageTitle={pageTitle}
//         selectedCity={activeCity}
//       />

//       {/* Sticky toolbar */}
//       <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
//         <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
//           <nav
//             className="flex items-center gap-1.5 text-xs"
//             aria-label="Breadcrumb"
//           >
//             <button
//               onClick={() => navigate(-1)}
//               aria-label="Go back"
//               className="w-7 h-7 border rounded-lg flex items-center justify-center hover:border-orange-400"
//             >
//               <ArrowLeft size={19} />
//             </button>
//             <ChevronRight size={13} className="text-gray-300" />
//             {/* ✅ City in breadcrumb */}
//             <span className="text-gray-400 text-xs capitalize">
//               {cityLabel}
//             </span>
//             <ChevronRight size={13} className="text-gray-300" />
//             <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg font-semibold truncate capitalize">
//               {pageTitle}
//             </span>
//           </nav>

//           <div className="flex items-center gap-2">
//             {/* City badge */}
//             <span className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white">
//               <MapPin size={11} className="text-orange-500" />
//               {cityLabel}
//             </span>
//             <div className="relative">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="text-xs border rounded-xl px-3 py-1.5 pr-7 appearance-none bg-white font-medium outline-none focus:border-orange-400"
//               >
//                 <option>Relevance</option>
//                 <option>High Rating</option>
//               </select>
//               <ChevronDown
//                 size={12}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//             </div>
//             <button
//               onClick={() => setFilterOpen(true)}
//               className="flex items-center gap-1.5 text-xs border rounded-xl px-3 py-1.5 font-medium"
//             >
//               <SlidersHorizontal size={12} /> Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-screen-xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <main className="flex-1 min-w-0">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-20">
//                 <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
//                 <p className="mt-4 text-gray-500 font-medium">
//                   Fetching best vendors in {cityLabel}...
//                 </p>
//               </div>
//             ) : error ? (
//               <div className="text-center py-10 text-red-500">
//                 <p>Oops! Something went wrong.</p>
//                 <button
//                   onClick={() => {
//                     lastFetchKeyRef.current = "";
//                     dispatch(
//                       fetchVendorsByCatAndSubcat({
//                         cateId: catId,
//                         subCateId,
//                         city: activeCity,
//                       }),
//                     );
//                   }}
//                   className="mt-4 text-orange-500 underline font-semibold"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : vendors.length > 0 ? (
//               <>
//                 <p className="text-sm text-gray-500 mb-4">
//                   Showing{" "}
//                   <span className="font-semibold text-gray-800">
//                     {vendors.length}
//                   </span>{" "}
//                   vendors in{" "}
//                   <span className="font-semibold text-orange-500 capitalize">
//                     {cityLabel}
//                   </span>
//                 </p>
//                 <div className="space-y-4">
//                   {vendors.map((biz) => (
//                     <BusinessCard
//                       key={biz.venId || biz._id}
//                       biz={{
//                         ...biz,
//                         name:
//                           biz.companyName ||
//                           biz.vendorName ||
//                           "Unknown Business",
//                         image:
//                           biz.image ||
//                           "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
//                         address:
//                           typeof biz.address === "object" &&
//                           Object.keys(biz.address).length === 0
//                             ? "Address not available"
//                             : biz.address,
//                         // --- FIX APPLIED HERE ---
//                         since: biz.startedIn || biz.yearOfEstablishment,
//                         // ------------------------
//                         subcategories: biz.subcategories || [],
//                         verified: biz.isVerified ?? true,
//                         profileCount: biz.views || 0,
//                         hours: biz.openingTime || "9:00 AM - 9:00 PM",
//                         phone: biz.phone || biz.mobile || "N/A",
//                         tickColour: biz.tickColour,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
//                 <Search size={40} className="mx-auto text-gray-300 mb-3" />
//                 <p className="text-gray-500 font-medium">
//                   No vendors found for{" "}
//                   <span className="font-bold text-gray-700 capitalize">
//                     {pageTitle}
//                   </span>{" "}
//                   in{" "}
//                   <span className="font-bold text-orange-500">{cityLabel}</span>
//                   .
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Try changing your city from the top bar.
//                 </p>
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="mt-4 text-orange-500 font-bold hover:underline"
//                 >
//                   Go Back
//                 </button>
//               </div>
//             )}
//           </main>

//           <div className="hidden lg:block w-72 shrink-0">
//             <Sidebar
//               categoryId={catId}
//               cityName={activeCity}
//               subcategoryId={subCateId}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorsByCatAndSubcat,
  fetchSubCategoryBanners,
  clearVendors,
} from "../../../redux/slice/category/getVendorByCatandSubcat";
import {
  ChevronRight,
  MapPin,
  Phone,
  ChevronDown,
  SlidersHorizontal,
  BadgeCheck,
  Clock,
  Share2,
  ArrowLeft,
  X,
  Search,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Sidebar from "./MainSidebar";
import Banner from "./Acbanner/Banner";
import { SEO } from "../../../hooks/useSEO";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function formatProfileCount(n) {
  if (!n) return "0";
  if (n >= 1000) {
    const val = n / 1000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
  }
  return String(n);
}

// ─── FilterOverlay ─────────────────────────────────────────────────────────────
function FilterOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Filters</h2>
            <X
              onClick={onClose}
              className="cursor-pointer text-gray-500"
              size={18}
            />
          </div>
          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Plan Badge Helper ─────────────────────────────────────────────────────────
function PlanBadge({ plan }) {
  if (!plan?.subCategory) return null;

  const planType = plan.subCategory.toLowerCase();

  const styles = `
    @keyframes fire-sweep {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes ember-pulse {
      0%, 100% { box-shadow: 0 0 0 0px rgba(234,88,12,0.0); }
      50% { box-shadow: 0 0 8px 2px rgba(234,88,12,0.22); }
    }
    @keyframes diamond-aura {
      0%, 100% { box-shadow: 0 0 0 0px rgba(99,102,241,0.0); }
      50% { box-shadow: 0 0 10px 3px rgba(99,102,241,0.2); }
    }
    @keyframes gold-aura {
      0%, 100% { box-shadow: 0 0 0 0px rgba(234,179,8,0.0); }
      50% { box-shadow: 0 0 10px 3px rgba(234,179,8,0.25); }
    }
    @keyframes pop-in {
      0% { transform: scale(0.7) translateY(4px); opacity: 0; }
      65% { transform: scale(1.08) translateY(-1px); opacity: 1; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    @keyframes sheen {
      0% { left: -60%; }
      60%, 100% { left: 120%; }
    }
    @keyframes icon-spin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(12deg) scale(1.15); }
      100% { transform: rotate(0deg) scale(1); }
    }
    @keyframes top-bounce {
      0%, 100% { transform: translateY(0px); }
      40% { transform: translateY(-2px); }
      70% { transform: translateY(1px); }
    }
    .pb-badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 12px 4px 8px; border-radius: 7px;
      font-size: 12px; font-weight: 700; font-style: italic;
      letter-spacing: 0.03em; white-space: nowrap;
      position: relative; overflow: hidden;
      animation: pop-in 0.4s cubic-bezier(.34,1.56,.64,1) both;
    }
    .pb-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
      animation: icon-spin 3s ease-in-out infinite;
    }
    .pb-icon-bounce {
      display: inline-flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0;
      animation: top-bounce 1.8s ease-in-out infinite;
    }
    .pb-sheen::before {
      content: '';
      position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
      animation: sheen 2.5s ease-in-out infinite;
    }
  `;

  const CheckSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <polyline
        points="2,6 5,9 10,3"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ShieldSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1 L11 3.5 V7 C11 9.5 8.5 11 6 11 C3.5 11 1 9.5 1 7 V3.5 Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="4,6 5.5,7.5 8,4.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const StarSvg = () => (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
      <polygon
        points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
        fill="white"
      />
    </svg>
  );

  // ── Prime / Dynamic / Gold ─────────────────────────────────────────────────
  if (["prime", "dynamic", "gold"].includes(planType)) {
    return (
      <>
        <style>{styles}</style>
        <span
          className="pb-badge pb-sheen"
          style={{
            background:
              "linear-gradient(100deg,#f0fdf4 0%,#dcfce7 30%,#bbf7d0 50%,#dcfce7 70%,#f0fdf4 100%)",
            backgroundSize: "300% auto",
            border: "1.5px solid #16a34a",
            color: "#14532d",
            animation:
              "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) both, fire-sweep 2.4s linear infinite, ember-pulse 2.2s ease-in-out infinite",
          }}
        >
          <span className="pb-icon" style={{ background: "#16a34a" }}>
            <CheckSvg />
          </span>
          Verified
        </span>
      </>
    );
  }
  // ── Diamond ────────────────────────────────────────────────────────────────
  if (planType === "diamond") {
    return (
      <>
        <style>{styles}</style>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            flexWrap: "wrap",
          }}
        >
          <span
            className="pb-badge"
            style={{
              background:
                "linear-gradient(100deg,#eef2ff 0%,#e0e7ff 40%,#c7d2fe 55%,#e0e7ff 70%,#eef2ff 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #6366f1",
              color: "#3730a3",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.1s both, fire-sweep 2.8s linear infinite, diamond-aura 2.5s ease-in-out infinite",
            }}
          >
            <span className="pb-icon" style={{ background: "#6366f1" }}>
              <ShieldSvg />
            </span>
            Trusted
          </span>

          <span
            className="pb-badge pb-sheen"
            style={{
              background:
                "linear-gradient(100deg,#f0fdf4 0%,#dcfce7 40%,#bbf7d0 55%,#dcfce7 70%,#f0fdf4 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #16a34a",
              color: "#14532d",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.2s both, fire-sweep 2.6s linear infinite, ember-pulse 2.4s ease-in-out 0.4s infinite",
            }}
          >
            <span className="pb-icon" style={{ background: "#16a34a" }}>
              <CheckSvg />
            </span>
            Verified
          </span>

          <span
            className="pb-badge"
            style={{
              background:
                "linear-gradient(100deg,#fffbeb 0%,#fef3c7 35%,#fde68a 50%,#fef3c7 70%,#fffbeb 100%)",
              backgroundSize: "300% auto",
              border: "1.5px solid #d97706",
              color: "#78350f",
              animation:
                "pop-in 0.4s cubic-bezier(.34,1.56,.64,1) 0.3s both, fire-sweep 2.2s linear infinite, gold-aura 2.2s ease-in-out 0.6s infinite",
            }}
          >
            <span className="pb-icon-bounce" style={{ background: "#d97706" }}>
              <StarSvg />
            </span>
            Top Vendor
          </span>
        </span>
      </>
    );
  }

  return null;
}

// ─── BusinessCard ──────────────────────────────────────────────────────────────
const getTickColorClass = (color) => {
  switch (color?.toLowerCase()) {
    case "red":
      return "text-red-500";
    case "blue":
      return "text-blue-500";
    case "green":
      return "text-green-500";
    case "gold":
    case "yellow":
      return "text-yellow-500";
    default:
      return "text-blue-500";
  }
};

const BusinessCard = memo(function BusinessCard({ biz }) {
  const [showNumber, setShowNumber] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const navigate = useNavigate();

  const VISIBLE = 2;
  const tags = Array.isArray(biz.subcategories) ? biz.subcategories : [];
  const visibleTags = showAllTags ? tags : tags.slice(0, VISIBLE);
  const hasMore = tags.length > VISIBLE;

  const handleBusinessClick = useCallback(() => {
    const { venId, companyName, vendorName, address } = biz;
    if (!venId) return;
    const slug = createSlug(companyName || vendorName || "business");
    const citySlug = createSlug(
      (typeof address === "object" ? address?.city : "") || "india",
    );
    navigate(`/business/${citySlug}/${venId}/${slug}`);
  }, [biz, navigate]);

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <div
          className="relative w-full sm:w-56 shrink-0"
          style={{ minHeight: "180px" }}
        >
          <img
            src={
              biz.image ||
              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80"
            }
            alt={biz.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 right-2.5 bg-white/90 text-gray-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Since {biz.since}
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={handleBusinessClick}
                className="text-base font-bold text-blue-700 hover:underline cursor-pointer"
              >
                {biz.name}
              </h3>
              {biz.verified && (
                <BadgeCheck
                  size={18}
                  className={`${getTickColorClass(biz.tickColour)} shrink-0`}
                />
              )}
              {/* Plan Badge — Verified / Trusted+Verified+TopVendor / Nothing */}
              <PlanBadge plan={biz.plan} />
            </div>
          </div>

          <div className="flex items-start gap-1.5 text-gray-500 text-xs">
            <MapPin size={12} className="mt-0.5 text-orange-500 shrink-0" />
            <span>
              {typeof biz.address === "object"
                ? biz.address?.city || "Location not provided"
                : biz.address || "Location not provided"}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {visibleTags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] border border-gray-300 text-gray-700 px-2.5 py-1 rounded-full bg-white font-medium"
              >
                {typeof tag === "object" ? tag.name : tag}
              </span>
            ))}
            {!showAllTags && hasMore && (
              <button
                onClick={() => setShowAllTags(true)}
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                See More
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={11} />
            <span>Open: {biz.hours || "9:00 AM - 9:00 PM"}</span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNumber(!showNumber)}
                className={`flex items-center justify-center gap-2 min-w-[140px] px-4 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                  showNumber
                    ? "bg-green-600 text-white shadow-inner"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {showNumber ? (
                  <>
                    <Phone size={13} className="animate-pulse" />
                    <span className="tracking-wider">{biz.phone || "N/A"}</span>
                  </>
                ) : (
                  <>
                    <Phone size={13} />
                    <span>Show Number</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

// ─── CategoryDetails ───────────────────────────────────────────────────────────
export default function CategoryDetails() {
  const { catId, subCateId, city, subcategorySlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
    useSelector((state) => state.vendorStore);

  const selectedCity = useSelector((state) => state.location.selectedCity);

  const cityFromUrl =
    city?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "";

  const activeCity = selectedCity || cityFromUrl;

  const lastFetchKeyRef = useRef("");

  useEffect(() => {
    if (!catId || !subCateId) return;
    const fetchKey = `${catId}-${subCateId}-${activeCity}`;
    if (lastFetchKeyRef.current === fetchKey) return;
    lastFetchKeyRef.current = fetchKey;

    dispatch(clearVendors());
    dispatch(
      fetchVendorsByCatAndSubcat({
        cateId: catId,
        subCateId,
        city: activeCity,
      }),
    );
    dispatch(fetchSubCategoryBanners({ cateId: catId, subCateId }));
  }, [catId, subCateId, activeCity, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearVendors());
      lastFetchKeyRef.current = "";
    };
  }, [dispatch]);

  const closeFilter = useCallback(() => setFilterOpen(false), []);

  const pageTitle =
    subcategoryName ||
    subcategorySlug
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Services";

  const cityLabel = activeCity || "India";

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${pageTitle} in ${cityLabel} | LocalTradeStreet`}
        description={`Find top-rated ${pageTitle} providers in ${cityLabel}. Compare verified vendors, view ratings, and get instant quotes on LocalTradeStreet.`}
        ogType="website"
      />

      <FilterOverlay open={filterOpen} onClose={closeFilter} />
      <Banner
        banners={banners}
        loading={bannerLoading}
        pageTitle={pageTitle}
        selectedCity={activeCity}
      />

      {/* Sticky toolbar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
          <nav
            className="flex items-center gap-1.5 text-xs"
            aria-label="Breadcrumb"
          >
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-7 h-7 border rounded-lg flex items-center justify-center hover:border-orange-400"
            >
              <ArrowLeft size={19} />
            </button>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="text-gray-400 text-xs capitalize">
              {cityLabel}
            </span>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg font-semibold truncate capitalize">
              {pageTitle}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white">
              <MapPin size={11} className="text-orange-500" />
              {cityLabel}
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border rounded-xl px-3 py-1.5 pr-7 appearance-none bg-white font-medium outline-none focus:border-orange-400"
              >
                <option>Relevance</option>
                <option>High Rating</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 text-xs border rounded-xl px-3 py-1.5 font-medium"
            >
              <SlidersHorizontal size={12} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
                <p className="mt-4 text-gray-500 font-medium">
                  Fetching best vendors in {cityLabel}...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                <p>Oops! Something went wrong.</p>
                <button
                  onClick={() => {
                    lastFetchKeyRef.current = "";
                    dispatch(
                      fetchVendorsByCatAndSubcat({
                        cateId: catId,
                        subCateId,
                        city: activeCity,
                      }),
                    );
                  }}
                  className="mt-4 text-orange-500 underline font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : vendors.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {vendors.length}
                  </span>{" "}
                  vendors in{" "}
                  <span className="font-semibold text-orange-500 capitalize">
                    {cityLabel}
                  </span>
                </p>
                <div className="space-y-4">
                  {vendors.map((biz) => (
                    <BusinessCard
                      key={biz.venId || biz._id}
                      biz={{
                        ...biz,
                        name:
                          biz.companyName ||
                          biz.vendorName ||
                          "Unknown Business",
                        image:
                          biz.image ||
                          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
                        address:
                          typeof biz.address === "object" &&
                          Object.keys(biz.address).length === 0
                            ? "Address not available"
                            : biz.address,
                        since: biz.startedIn || biz.yearOfEstablishment,
                        subcategories: biz.subcategories || [],
                        verified: biz.isVerified ?? true,
                        profileCount: biz.views || 0,
                        hours: biz.openingTime || "9:00 AM - 9:00 PM",
                        phone: biz.phone || biz.mobile || "N/A",
                        tickColour: biz.tickColour,
                        plan: biz.plan,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                <Search size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">
                  No vendors found for{" "}
                  <span className="font-bold text-gray-700 capitalize">
                    {pageTitle}
                  </span>{" "}
                  in{" "}
                  <span className="font-bold text-orange-500">{cityLabel}</span>
                  .
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try changing your city from the top bar.
                </p>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-4 text-orange-500 font-bold hover:underline"
                >
                  Go Back
                </button>
              </div>
            )}
          </main>

          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar
              categoryId={catId}
              cityName={activeCity}
              subcategoryId={subCateId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
