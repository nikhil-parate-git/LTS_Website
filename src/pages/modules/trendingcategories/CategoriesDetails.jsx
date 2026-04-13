// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchVendorsByCatAndSubcat,
//   fetchSubCategoryBanners,
// } from "../../../redux/slice/category/getVendorByCatandSubcat";
// import { fetchSubcategories } from "../../../redux/slice/category/getAllSubcategorySlice";
// import {
//   ChevronRight,
//   MapPin,
//   Phone,
//   Eye,
//   ChevronDown,
//   SlidersHorizontal,
//   BadgeCheck,
//   Star,
//   Clock,
//   Zap,
//   Share2,
//   ArrowLeft,
//   X,
//   Search,
// } from "lucide-react";
// import Sidebar from "./MainSidebar";
// import Banner from "./Acbanner/Banner";

// function toSlug(name = "") {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");
// }

// function formatProfileCount(n) {
//   if (!n) return "0";
//   if (n >= 1000) {
//     const val = n / 1000;
//     return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
//   }
//   return String(n);
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

//   const getTickColorClass = (color) => {
//     switch (color?.toLowerCase()) {
//       case "red":
//         return "text-red-500";
//       case "blue":
//         return "text-blue-500";
//       case "green":
//         return "text-green-500";
//       case "gold":
//       case "yellow":
//         return "text-yellow-500";
//       default:
//         return "text-blue-500";
//     }
//   };

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
//                 <BadgeCheck
//                   size={18}
//                   className={`${getTickColorClass(biz.tickColour)} shrink-0`}
//                 />
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
//   // ✅ Route: /service/:categorySlug/:subcategorySlug
//   const { categorySlug, subcategorySlug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [filterOpen, setFilterOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("Relevance");

//   const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
//     useSelector((state) => state.vendorStore);
//   const { selectedCity } = useSelector((state) => state.location);

//   const categoriesFromStore = useSelector(
//     (state) => state.categories?.categories || [],
//   );
//   const subcategoriesFromStore = useSelector(
//     (state) => state.subcategory?.subcategories || [],
//   );
//   const subcatLoading = useSelector(
//     (state) => state.subcategory?.loading || false,
//   );

//   // ── Slug → ID resolve karo ───────────────────────────────────
//   const categoryId = (() => {
//     const matched = categoriesFromStore.find(
//       (cat) => toSlug(cat.name || "") === categorySlug,
//     );
//     return matched?.id || matched?._id || null;
//   })();

//   const subcategoryId = (() => {
//     const matched = subcategoriesFromStore.find(
//       (sub) => toSlug(sub.name || "") === subcategorySlug,
//     );
//     return matched?.id || matched?._id || null;
//   })();

//   // ✅ FIX: require() hata diya — ab proper ESM import se fetchSubcategories use ho raha hai
//   // Agar user direct URL se aaye aur subcategories store mein na hon to fetch karo
//   useEffect(() => {
//     if (categoryId && subcategoriesFromStore.length === 0) {
//       dispatch(fetchSubcategories(categoryId));
//     }
//   }, [dispatch, categoryId, subcategoriesFromStore.length]);

//   // ── Vendors fetch karo jab dono IDs mil jayein ──────────────
//   useEffect(() => {
//     if (categoryId && subcategoryId) {
//       dispatch(
//         fetchVendorsByCatAndSubcat({
//           categoryId,
//           subcategoryId,
//           city: selectedCity,
//         }),
//       );
//       dispatch(fetchSubCategoryBanners({ categoryId, subcategoryId }));
//     }
//   }, [dispatch, categoryId, subcategoryId, selectedCity]);

//   // Abhi IDs resolve ho rahi hain — loader dikhao
//   if (!categoryId || (!subcategoryId && subcatLoading)) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
//         <p className="mt-4 text-gray-500 font-medium">Loading...</p>
//       </div>
//     );
//   }

//   // IDs nahi mili aur loading bhi nahi — not found
//   if (!categoryId || !subcategoryId) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
//         <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl">
//           🔍
//         </div>
//         <h3 className="text-lg font-bold text-gray-700">Page not found</h3>
//         <p className="text-sm text-gray-400 text-center px-6">
//           Please go back and select a service.
//         </p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-2 bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
//         >
//           ← Go Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <FilterOverlay open={filterOpen} onClose={() => setFilterOpen(false)} />

//       <Banner
//         banners={banners}
//         loading={bannerLoading}
//         pageTitle=""
//         selectedCity={selectedCity}
//       />

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
//               {subcategoryName ||
//                 subcategorySlug?.replace(/-/g, " ") ||
//                 "Vendors"}
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

//       <div className="max-w-screen-xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <div className="flex-1 min-w-0">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-20">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
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
//                   vendors.map((biz) => (
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
//                         tickColour: biz.tickColour,
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



import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendorsByCatAndSubcat,
  fetchSubCategoryBanners,
} from "../../../redux/slice/category/getVendorByCatandSubcat";
import { fetchSubcategories } from "../../../redux/slice/category/getAllSubcategorySlice";
import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import {
  ChevronRight, MapPin, Phone, Eye, ChevronDown,
  SlidersHorizontal, BadgeCheck, Clock,
  Zap, Share2, ArrowLeft, X, Search, Loader2,
} from "lucide-react";
import Sidebar from "./MainSidebar";
import Banner from "./Acbanner/Banner";
import { SEO } from "../../../hooks/useSEO";

const createSlug = (title = "") =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function formatProfileCount(n) {
  if (!n) return "0";
  if (n >= 1000) {
    const val = n / 1000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
  }
  return String(n);
}

// ─── FilterOverlay ────────────────────────────────────────────────────────────
function FilterOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Filters</h2>
            <X onClick={onClose} className="cursor-pointer text-gray-500" size={18} />
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

// ─── BusinessCard — memoised; internal state only, no parent re-renders ────────
const getTickColorClass = (color) => {
  switch (color?.toLowerCase()) {
    case "red":    return "text-red-500";
    case "blue":   return "text-blue-500";
    case "green":  return "text-green-500";
    case "gold":
    case "yellow": return "text-yellow-500";
    default:       return "text-blue-500";
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
    const city = createSlug(
      (typeof address === "object" ? address?.city : "") || "india"
    );
    navigate(`/business/${city}/${venId}/${slug}`);
  }, [biz, navigate]);

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <div
          className="relative w-full sm:w-56 shrink-0"
          style={{ minHeight: "180px" }}
        >
          <img
            src={biz.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80"}
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
            </div>
            <button aria-label="Share" className="text-gray-400 hover:text-orange-500">
              <Share2 size={14} />
            </button>
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
    </article>
  );
});

// ─── CategoryDetails ──────────────────────────────────────────────────────────
export default function CategoryDetails() {
  const { city, subCateId, subcategorySlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");
  const [resolving, setResolving] = useState(false);

  const vendorFetchedRef = useRef(false);
  const resolutionStartedRef = useRef(false);

  const { vendors, loading, banners, bannerLoading, error, subcategoryName } =
    useSelector((state) => state.vendorStore);
  const { selectedCity } = useSelector((state) => state.location);

  const subcategoriesFromStore = useSelector(
    (state) => state.subcategory?.subcategories || []
  );
  const categoriesFromStore = useSelector(
    (state) => state.categories?.categories || []
  );

  const matchedSubcat = subcategoriesFromStore.find(
    (sub) => sub.subCateId === subCateId
  );
  const parentCatMongoId = matchedSubcat?.categoryName || null;
  const parentCategory = categoriesFromStore.find(
    (cat) => (cat._id || cat.id) === parentCatMongoId
  );
  const cateId = parentCategory?.cateId || null;

  // STEP 1: Resolve subcategory — only once
  useEffect(() => {
    if (matchedSubcat || resolutionStartedRef.current || !subCateId) return;
    resolutionStartedRef.current = true;

    const resolve = async () => {
      setResolving(true);
      try {
        let cats = categoriesFromStore;
        if (cats.length === 0) {
          const result = await dispatch(fetchAllCategories());
          cats = Array.isArray(result?.payload?.data)
            ? result.payload.data
            : Array.isArray(result?.payload)
            ? result.payload
            : [];
        }
        for (const cat of cats) {
          const catId = cat.cateId;
          if (!catId) continue;
          const res = await dispatch(fetchSubcategories(catId));
          const subs = Array.isArray(res?.payload?.data) ? res.payload.data : [];
          const found = subs.find((s) => s.subCateId === subCateId);
          if (found) break;
        }
      } finally {
        setResolving(false);
      }
    };

    resolve();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCateId]); // intentionally narrow — refs guard against double-run

  // STEP 2: Fetch vendors once cateId + subCateId ready
  useEffect(() => {
    if (!cateId || !subCateId || vendorFetchedRef.current) return;
    vendorFetchedRef.current = true;

    const cityName = city?.replace(/-/g, " ") || selectedCity || "";
    dispatch(fetchVendorsByCatAndSubcat({ cateId, subCateId, city: cityName }));
    dispatch(fetchSubCategoryBanners({ cateId, subCateId }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateId, subCateId]); // city/selectedCity intentionally excluded to avoid re-fetch on location change

  const closeFilter = useCallback(() => setFilterOpen(false), []);

  const pageTitle =
    subcategoryName ||
    matchedSubcat?.name ||
    subcategorySlug?.replace(/-/g, " ") ||
    "Services";
  const cityLabel = city?.replace(/-/g, " ") || selectedCity || "India";

  if (resolving) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (!matchedSubcat && !resolving) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl">🔍</div>
        <h3 className="text-lg font-bold text-gray-700">Service not found</h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${pageTitle} in ${cityLabel} | LocalTradeStreet`}
        description={`Find top-rated ${pageTitle} providers in ${cityLabel}. Compare verified vendors, view ratings, and get instant quotes on LocalTradeStreet.`}
        canonical={`https://www.localtradestreet.com/service/${city}/${subCateId}/${subcategorySlug}`}
        ogType="website"
      />

      <FilterOverlay open={filterOpen} onClose={closeFilter} />
      <Banner
        banners={banners}
        loading={bannerLoading}
        pageTitle={pageTitle}
        selectedCity={selectedCity}
      />

      {/* Sticky toolbar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
          <nav className="flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-7 h-7 border rounded-lg flex items-center justify-center hover:border-orange-400"
            >
              <ArrowLeft size={19} />
            </button>
            <ChevronRight size={13} className="text-gray-300" />
            {city && (
              <>
                <span className="text-gray-400 text-xs capitalize">
                  {city.replace(/-/g, " ")}
                </span>
                <ChevronRight size={13} className="text-gray-300" />
              </>
            )}
            <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-lg font-semibold truncate capitalize">
              {pageTitle}
            </span>
          </nav>

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
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
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
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500" />
                <p className="mt-4 text-gray-500 font-medium">
                  Fetching best vendors for you...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                <p>Oops! Something went wrong while loading vendors.</p>
                <button
                  onClick={() => {
                    vendorFetchedRef.current = false;
                    const cityName = city?.replace(/-/g, " ") || selectedCity || "";
                    dispatch(fetchVendorsByCatAndSubcat({ cateId, subCateId, city: cityName }));
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
                  <span className="font-semibold text-gray-800">{vendors.length}</span>{" "}
                  vendors
                </p>
                <div className="space-y-4">
                  {vendors.map((biz) => (
                    <BusinessCard
                      key={biz.id || biz._id}
                      biz={{
                        ...biz,
                        name: biz.companyName || biz.vendorName || "Unknown Business",
                        image: biz.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
                        address:
                          typeof biz.address === "object" &&
                          Object.keys(biz.address).length === 0
                            ? "Address not available"
                            : biz.address,
                        since: biz.yearOfEstablishment || "2024",
                        subcategories: biz.subcategories || [],
                        verified: biz.isVerified ?? true,
                        profileCount: biz.views || 0,
                        hours: biz.openingTime || "9:00 AM - 9:00 PM",
                        phone: biz.phone || biz.mobile || "N/A",
                        tickColour: biz.tickColour,
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                <Search size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No vendors found for this selection.</p>
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
              categoryId={cateId}
              cityName={selectedCity}
              subcategoryId={subCateId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}