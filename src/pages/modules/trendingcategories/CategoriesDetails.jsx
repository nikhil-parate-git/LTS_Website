
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVendorsByCatAndSubcat, fetchSubCategoryBanners } from "../../../redux/slice/category/getVendorByCatandSubcat";

// import {
//   ChevronRight,
//   MapPin,
//   Phone,
//   Eye,
//   Send,
//   ChevronDown,
//   SlidersHorizontal,
//   BadgeCheck,
//   Star,
//   Clock,
//   Shield,
//   Zap,
//   Share2,
//   ArrowLeft,
//   CheckCircle,
//   X,
//   Search,
// } from "lucide-react";
// import Sidebar from "./MainSidebar";
// import Banner from "./Acbanner/Banner";

// function formatProfileCount(n) {
//   if (!n) return "0";
//   if (n >= 1000) {
//     const val = n / 1000;
//     return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
//   }
//   return String(n);
// }

// function Stars({ rating }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((s) => (
//         <Star
//           key={s}
//           size={13}
//           className={
//             s <= Math.round(rating || 0)
//               ? "fill-amber-400 text-amber-400"
//               : "text-gray-300 fill-gray-200"
//           }
//         />
//       ))}
//     </div>
//   );
// }

// function FilterOverlay({ open, onClose }) {
//   if (!open) return null;
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-5">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold">Filters</h2>
//             <X onClick={onClose} className="cursor-pointer" size={18} />
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

// function BusinessCard({ biz }) {
//   const [showNumber, setShowNumber] = useState(false);
//   const navigate = useNavigate();
//   const [showAllTags, setShowAllTags] = useState(false);

//   const VISIBLE = 2;
//   const tags = Array.isArray(biz.subcategories) ? biz.subcategories : [];
//   const visibleTags = showAllTags ? tags : tags.slice(0, VISIBLE);
//   const hasMore = tags.length > VISIBLE;

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
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
//                 onClick={() => navigate(`/business/${biz.id || biz._id}`)}
//                 className="text-base font-bold text-blue-700 hover:underline cursor-pointer"
//               >
//                 {biz.name}
//               </h3>
//               {biz.verified && (
//                 <BadgeCheck size={15} className="text-blue-500 shrink-0" />
//               )}
//             </div>
//             <button className="text-gray-400 hover:text-orange-500">
//               <Share2 size={14} />
//             </button>
//           </div>

//           <div className="flex items-start gap-1.5 text-gray-500 text-xs">
//             <MapPin size={12} className="mt-0.5 text-orange-500 shrink-0" />
//             <span>
//               {typeof biz.address === "object"
//                 ? biz.address.city || "Location not provided"
//                 : biz.address}
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
//             <Clock size={11} />{" "}
//             <span>Open: {biz.hours || "9:00 AM - 9:00 PM"}</span>
//           </div>

//           <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowNumber(!showNumber)}
//                 className={`flex items-center justify-center gap-2 min-w-[140px] px-4 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${
//                   showNumber
//                     ? "bg-green-600 text-white border-green-700 shadow-inner"
//                     : "bg-orange-500 text-white hover:bg-orange-600"
//                 }`}
//               >
//                 {showNumber ? (
//                   <>
//                     <Phone size={13} className="animate-pulse" />
//                     <span className="tracking-wider">{biz.phone}</span>
//                   </>
//                 ) : (
//                   <>
//                     <Phone size={13} />
//                     <span>Show Number</span>
//                   </>
//                 )}
//               </button>
//               <button className="flex items-center gap-1 border border-orange-400 text-orange-500 text-xs font-bold px-3 py-3 rounded-lg">
//                 <Zap size={11} className="fill-orange-400" /> Sponsored
//               </button>
//             </div>
//             <div className="flex items-center gap-1 text-xs text-gray-400">
//               <Eye size={12} className="text-orange-400" />
//               <span className="font-semibold text-gray-600">
//                 {formatProfileCount(biz.profileCount || 0)}
//               </span>
//               <span>Views</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function CategoryDetails() {
//   const { categoryId, subcategoryId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("Relevance");

//   const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
//     useSelector((state) => state.vendorStore);

//   const { selectedCity } = useSelector((state) => state.location);

//   useEffect(() => {
//     if (categoryId && subcategoryId) {
//       dispatch(fetchVendorsByCatAndSubcat({ categoryId, subcategoryId, city: selectedCity }));
//       dispatch(fetchSubCategoryBanners({ categoryId, subcategoryId }));
//     } else {
//       console.log("Missing categoryId or subcategoryId");
//     }
//   }, [dispatch, categoryId, subcategoryId, selectedCity]);

//   // ── "Top 20 Residential Pest Control" format ──
//   const bannerTitle = subcategoryName ? `Top 20 ${subcategoryName}` : "";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <FilterOverlay open={filterOpen} onClose={() => setFilterOpen(false)} />

//       {/* ── bannerLoading prevents welcome blink, subcategoryName as title ── */}
//       <Banner
//         banners={banners}
//         loading={bannerLoading}
//         pageTitle={bannerTitle}
//       />

//       {/* Header Sticky Bar */}
//       <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
//         <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
//           <div className="flex items-center gap-1.5 text-xs">
//             <button
//               onClick={() => navigate(-1)}
//               className="w-7 h-7 border rounded-lg flex items-center justify-center hover:border-orange-400"
//             >
//               <ArrowLeft size={19} />
//             </button>
//             <ChevronRight size={13} className="text-gray-300" />
//             <span className="bg-emerald-500 text-white text-base px-3 py-1 rounded-lg font-semibold truncate">
//               Vendors
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
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

//       {/* Main Content */}
//       <div className="max-w-screen-xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <div className="flex-1 min-w-0">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-20">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
//                 <p className="mt-4 text-gray-500 font-medium">
//                   Fetching best vendors for you...
//                 </p>
//               </div>
//             ) : error ? (
//               <div className="text-center py-10 text-red-500">
//                 <p>Oops! Something went wrong while loading vendors.</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {vendors.length > 0 ? (
//                   vendors?.map((biz) => (
//                     <BusinessCard
//                       key={biz.id || biz._id}
//                       biz={{
//                         ...biz,
//                         name: biz.companyName || "Unknown Business",
//                         image:
//                           biz.image ||
//                           "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
//                         address:
//                           typeof biz.address === "object" &&
//                           Object.keys(biz.address).length === 0
//                             ? "Address not available"
//                             : biz.address,
//                         since: biz.yearOfEstablishment || "2024",
//                         subcategories: biz.subcategories || [],
//                         verified: biz.isVerified || true,
//                         profileCount: biz.views || 0,
//                         hours: biz.openingTime || "9:00 AM - 9:00 PM",
//                       }}
//                     />
//                   ))
//                 ) : (
//                   <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
//                     <Search size={40} className="mx-auto text-gray-300 mb-3" />
//                     <p className="text-gray-500 font-medium">
//                       No vendors found for this selection.
//                     </p>
//                     <button
//                       onClick={() => navigate(-1)}
//                       className="mt-4 text-orange-500 font-bold hover:underline"
//                     >
//                       Go Back
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Desktop Sidebar */}
//           <div className="hidden lg:block w-72 shrink-0">
//             <Sidebar
//               categoryId={categoryId}
//               cityName={selectedCity}
//               subcategoryId={subcategoryId}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorsByCatAndSubcat, fetchSubCategoryBanners } from "../../../redux/slice/category/getVendorByCatandSubcat";

import {
  ChevronRight,
  MapPin,
  Phone,
  Eye,
  Send,
  ChevronDown,
  SlidersHorizontal,
  BadgeCheck,
  Star,
  Clock,
  Shield,
  Zap,
  Share2,
  ArrowLeft,
  CheckCircle,
  X,
  Search,
} from "lucide-react";
import Sidebar from "./MainSidebar";
import Banner from "./Acbanner/Banner";

function formatProfileCount(n) {
  if (!n) return "0";
  if (n >= 1000) {
    const val = n / 1000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
  }
  return String(n);
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={
            s <= Math.round(rating || 0)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

function FilterOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Filters</h2>
            <X onClick={onClose} className="cursor-pointer" size={18} />
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

function BusinessCard({ biz }) {
  const [showNumber, setShowNumber] = useState(false);
  const navigate = useNavigate();
  const [showAllTags, setShowAllTags] = useState(false);

  const VISIBLE = 2;
  const tags = Array.isArray(biz.subcategories) ? biz.subcategories : [];
  const visibleTags = showAllTags ? tags : tags.slice(0, VISIBLE);
  const hasMore = tags.length > VISIBLE;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
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
                onClick={() => navigate(`/business/${biz.id || biz._id}`)}
                className="text-base font-bold text-blue-700 hover:underline cursor-pointer"
              >
                {biz.name}
              </h3>
              {biz.verified && (
                <BadgeCheck size={15} className="text-blue-500 shrink-0" />
              )}
            </div>
            <button className="text-gray-400 hover:text-orange-500">
              <Share2 size={14} />
            </button>
          </div>

          <div className="flex items-start gap-1.5 text-gray-500 text-xs">
            <MapPin size={12} className="mt-0.5 text-orange-500 shrink-0" />
            <span>
              {typeof biz.address === "object"
                ? biz.address.city || "Location not provided"
                : biz.address}
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
            <Clock size={11} />{" "}
            <span>Open: {biz.hours || "9:00 AM - 9:00 PM"}</span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNumber(!showNumber)}
                className={`flex items-center justify-center gap-2 min-w-[140px] px-4 py-3 rounded-lg text-xs font-bold transition-all duration-300 ${
                  showNumber
                    ? "bg-green-600 text-white border-green-700 shadow-inner"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {showNumber ? (
                  <>
                    <Phone size={13} className="animate-pulse" />
                    <span className="tracking-wider">{biz.phone}</span>
                  </>
                ) : (
                  <>
                    <Phone size={13} />
                    <span>Show Number</span>
                  </>
                )}
              </button>
              <button className="flex items-center gap-1 border border-orange-400 text-orange-500 text-xs font-bold px-3 py-3 rounded-lg">
                <Zap size={11} className="fill-orange-400" /> Sponsored
              </button>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye size={12} className="text-orange-400" />
              <span className="font-semibold text-gray-600">
                {formatProfileCount(biz.profileCount || 0)}
              </span>
              <span>Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryDetails() {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
    useSelector((state) => state.vendorStore);

  // ── City filter ke liye ──
  const { selectedCity } = useSelector((state) => state.location);

  useEffect(() => {
    if (categoryId && subcategoryId) {
      dispatch(fetchVendorsByCatAndSubcat({ categoryId, subcategoryId, city: selectedCity }));
      dispatch(fetchSubCategoryBanners({ categoryId, subcategoryId }));
    }
  }, [dispatch, categoryId, subcategoryId, selectedCity]);

  const bannerTitle = subcategoryName ? `Top 20 ${subcategoryName} in ${selectedCity}` : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterOverlay open={filterOpen} onClose={() => setFilterOpen(false)} />

      <Banner
        banners={banners}
        loading={bannerLoading}
        pageTitle={bannerTitle}
        selectedCity={selectedCity}
      />

      {/* Header Sticky Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => navigate(-1)}
              className="w-7 h-7 border rounded-lg flex items-center justify-center hover:border-orange-400"
            >
              <ArrowLeft size={19} />
            </button>
            <ChevronRight size={13} className="text-gray-300" />
            <span className="bg-emerald-500 text-white text-base px-3 py-1 rounded-lg font-semibold truncate">
              Vendors
            </span>
          </div>

          <div className="flex items-center gap-2">
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

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                <p className="mt-4 text-gray-500 font-medium">
                  Fetching best vendors for you...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                <p>Oops! Something went wrong while loading vendors.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {vendors.length > 0 ? (
                  vendors?.map((biz) => (
                    <BusinessCard
                      key={biz.id || biz._id}
                      biz={{
                        ...biz,
                        name: biz.companyName || "Unknown Business",
                        image:
                          biz.image ||
                          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
                        address:
                          typeof biz.address === "object" &&
                          Object.keys(biz.address).length === 0
                            ? "Address not available"
                            : biz.address,
                        since: biz.yearOfEstablishment || "2024",
                        subcategories: biz.subcategories || [],
                        verified: biz.isVerified || true,
                        profileCount: biz.views || 0,
                        hours: biz.openingTime || "9:00 AM - 9:00 PM",
                      }}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                    <Search size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 font-medium">
                      No vendors found for this selection.
                    </p>
                    <button
                      onClick={() => navigate(-1)}
                      className="mt-4 text-orange-500 font-bold hover:underline"
                    >
                      Go Back
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar
              categoryId={categoryId}
              cityName={selectedCity}
              subcategoryId={subcategoryId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}