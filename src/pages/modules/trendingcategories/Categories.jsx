
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubcategories, clearSubcategories, fetchCategoryBanners } from "../../../redux/slice/category/getAllSubcategorySlice";
// import {
//   Home,
//   Star,
//   ChevronRight,
//   Grid3X3,
//   ArrowLeft,
//   X,
//   Send,
//   Loader2
// } from "lucide-react";
// import Banner from "./Acbanner/Banner";
// import SubmitEnquiry from "./SubmitEnquiry";
// import Sidebar from "./MainSidebar";

// function StarRating({ rating = 3.6 }) {
//   return (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           size={15}
//           fill={star <= Math.floor(rating) ? "#f97316" : "#fed7aa"}
//           stroke="#f97316"
//           strokeWidth={1.5}
//         />
//       ))}
//       <span className="text-xs font-semibold text-gray-500 ml-1">{rating}</span>
//     </div>
//   );
// }

// function SubCategoryCard({ item, onCardClick, index }) {
//   return (
//     <div
//       onClick={() => onCardClick(item)}
//       className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-orange-300 cursor-pointer transition-all duration-300 hover:-translate-y-2"
//       style={{ animationDelay: `${index * 40}ms` }}
//     >
//       <div className="w-full overflow-hidden relative bg-gray-100" style={{ aspectRatio: "3/2" }}>
//         <img
//           src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"}
//           alt={item.name}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//           onError={(e) => {
//             e.target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80";
//           }}
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
//         <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
//           <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
//             View
//           </span>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
//           <p className="text-white text-sm font-bold leading-tight drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             {item.name}
//           </p>
//         </div>
//       </div>
//       <div className="px-4 py-4 border-t border-gray-50 bg-white">
//         <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 leading-snug transition-colors duration-200 text-center">
//           {item.name}
//         </p>
//       </div>
//     </div>
//   );
// }

// function MobileSidebarDrawer({ open, onClose, cityName }) {
//   useEffect(() => {
//     if (open) document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   if (!open) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/0 z-40" onClick={onClose()} />
//       <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-gray-50 z-50 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
//         <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
//           <span className="font-bold text-gray-800 text-sm">Quick Connect</span>
//           <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
//             <X size={16} />
//           </button>
//         </div>
//         <div className="p-4"><Sidebar cityName={cityName} /></div>
//       </div>
//     </>
//   );
// }

// export default function SubCategory() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [showModal, setShowModal] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const {
//     subcategories,
//     categoryName,
//     banners,
//     loading,
//     bannerLoading,
//     error,
//   } = useSelector((state) => state.subcategory);

//   useEffect(() => {
//     if (slug) {
//       dispatch(fetchSubcategories(slug));
//       dispatch(fetchCategoryBanners(slug));
//     }
//     return () => {
//       dispatch(clearSubcategories());
//     };
//   }, [dispatch, slug]);

//   // ── "Top 20 Pest Control Services" format ──
//   const bannerTitle = categoryName ? `Top 20 ${categoryName}` : "";

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Banner
//         banners={banners}
//         loading={bannerLoading}
//         pageTitle={bannerTitle}
//       />

//       <MobileSidebarDrawer
//         open={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         cityName="Delhi"
//       />

//       {/* ── Breadcrumb / Header ── */}
//       <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-2 flex-wrap min-w-0">
//             <button
//               onClick={() => navigate(-1)}
//               className="group flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-500 hover:border-orange-500 transition-all duration-200"
//             >
//               <ArrowLeft size={15} className="text-orange-500 group-hover:text-white" />
//             </button>
//             <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-base font-medium text-gray-500 hover:text-orange-500 hidden sm:flex">
//               <Home size={13} />
//               <span>Home</span>
//             </button>
//             <ChevronRight size={14} className="text-gray-300 hidden sm:block" />
//             <div className="flex items-center gap-2 min-w-0">
//               <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
//                 {categoryName || "Services"}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
//             <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
//               <Grid3X3 size={12} className="text-gray-400" />
//               <span className="font-semibold text-gray-700">{subcategories?.length || 0}</span> services
//             </span>
//             <StarRating rating={3.6} />
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-1.5 text-xs bg-orange-500 text-white rounded-xl px-3 py-1.5 font-bold">
//               <Send size={12} /> Connect
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Main Content ── */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-6">
//           <div className="flex-1 min-w-0">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-32">
//                 <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
//                 <p className="mt-4 text-gray-500 font-medium">Fetching services...</p>
//               </div>
//             ) : error ? (
//               <div className="text-center py-24 bg-red-50 rounded-3xl border border-red-100">
//                 <p className="text-red-500 font-bold">Error: {error}</p>
//                 <button onClick={() => dispatch(fetchSubcategories(slug))} className="mt-4 text-orange-500 underline">Try Again</button>
//               </div>
//             ) : subcategories && subcategories.length > 0 ? (
//               <>
//                 <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
//                   <p className="text-sm text-gray-500">
//                     Showing <span className="font-semibold text-gray-800">{subcategories.length}</span> services
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//                   {subcategories.map((item, index) => (
//                     <SubCategoryCard
//                       key={item._id || item.id}
//                       item={item}
//                       onCardClick={() => navigate(`/service/${item.categoryName}/${item.id}`)}
//                       index={index}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-24 text-center">
//                 <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-4">🔍</div>
//                 <h3 className="text-lg font-bold text-gray-700">No services found</h3>
//                 <button onClick={() => navigate(-1)} className="mt-6 bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
//                   ← Go Back
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="hidden lg:block w-72 shrink-0">
//             <Sidebar cityName="Delhi" />
//           </div>
//         </div>
//       </div>

//       {showModal && <SubmitEnquiry onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategories, fetchCategoryBanners } from "../../../redux/slice/category/getAllSubcategorySlice";
// ── clearSubcategories import bhi hata diya ──
import {
  Home,
  Star,
  ChevronRight,
  Grid3X3,
  ArrowLeft,
  X,
  Send,
  Loader2
} from "lucide-react";
import Banner from "./Acbanner/Banner";
import SubmitEnquiry from "./SubmitEnquiry";
import Sidebar from "./MainSidebar";

function StarRating({ rating = 3.6 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={star <= Math.floor(rating) ? "#f97316" : "#fed7aa"}
          stroke="#f97316"
          strokeWidth={1.5}
        />
      ))}
      <span className="text-xs font-semibold text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

function SubCategoryCard({ item, onCardClick, index }) {
  return (
    <div
      onClick={() => onCardClick(item)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-orange-300 cursor-pointer transition-all duration-300 hover:-translate-y-2"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="w-full overflow-hidden relative bg-gray-100" style={{ aspectRatio: "3/2" }}>
        <img
          src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80";
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            View
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-bold leading-tight drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.name}
          </p>
        </div>
      </div>
      <div className="px-4 py-4 border-t border-gray-50 bg-white">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 leading-snug transition-colors duration-200 text-center">
          {item.name}
        </p>
      </div>
    </div>
  );
}

function MobileSidebarDrawer({ open, onClose, cityName }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/0 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-gray-50 z-50 overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
          <span className="font-bold text-gray-800 text-sm">Quick Connect</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500">
            <X size={16} />
          </button>
        </div>
        <div className="p-4"><Sidebar cityName={cityName} /></div>
      </div>
    </>
  );
}

export default function SubCategory() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    subcategories,
    categoryName,
    banners,
    loading,
    bannerLoading,
    error,
  } = useSelector((state) => state.subcategory);

  const { selectedCity } = useSelector((state) => state.location);

  useEffect(() => {
    if (slug) {
      dispatch(fetchSubcategories(slug));
      dispatch(fetchCategoryBanners(slug));
    }
    // ── clearSubcategories BILKUL nahi — yahi white page ka reason tha ──
  }, [dispatch, slug]);

  const bannerTitle = categoryName ? `Top 20 ${categoryName}` : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner
        banners={banners}
        loading={bannerLoading}
        pageTitle={bannerTitle}
        selectedCity={selectedCity}
      />

      <MobileSidebarDrawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        cityName={selectedCity}
      />

      {/* ── Breadcrumb / Header ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-500 hover:border-orange-500 transition-all duration-200"
            >
              <ArrowLeft size={15} className="text-orange-500 group-hover:text-white" />
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-base font-medium text-gray-500 hover:text-orange-500 hidden sm:flex">
              <Home size={13} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="text-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2 min-w-0">
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                {categoryName || "Services"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <Grid3X3 size={12} className="text-gray-400" />
              <span className="font-semibold text-gray-700">{subcategories?.length || 0}</span> services
            </span>
            <StarRating rating={3.6} />
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden flex items-center gap-1.5 text-xs bg-orange-500 text-white rounded-xl px-3 py-1.5 font-bold">
              <Send size={12} /> Connect
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                <p className="mt-4 text-gray-500 font-medium">Fetching services...</p>
              </div>
            ) : error ? (
              <div className="text-center py-24 bg-red-50 rounded-3xl border border-red-100">
                <p className="text-red-500 font-bold">Error: {error}</p>
                <button onClick={() => dispatch(fetchSubcategories(slug))} className="mt-4 text-orange-500 underline">Try Again</button>
              </div>
            ) : subcategories && subcategories.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-800">{subcategories.length}</span> services
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {subcategories.map((item, index) => (
                    <SubCategoryCard
                      key={item._id || item.id}
                      item={item}
                      onCardClick={() => navigate(`/service/${item.categoryName}/${item.id}`)}
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700">No services found</h3>
                <button onClick={() => navigate(-1)} className="mt-6 bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
                  ← Go Back
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar cityName={selectedCity} />
          </div>
        </div>
      </div>

      {showModal && <SubmitEnquiry onClose={() => setShowModal(false)} />}
    </div>
  );
}