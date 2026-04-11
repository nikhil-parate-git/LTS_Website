// import { useState, useEffect, useRef, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   MapPin,
//   Mic,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   Loader2,
// } from "lucide-react";

// import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
// import { fetchHomeBanners } from "../../../redux/slice/homecityBanner/getAllCityBanner";
// import { fetchCities } from "../../../redux/slice/citydropdown/getCityDropdownSlice";
// import { setCity } from "../../../redux/slice/locationSlice";

// // Components
// import ListBusiness from "../businesslisting/ListBusiness";
// import TopRatedBusinesses from "../topratedbusiness/TopRatedBusinesses";
// import TopCategoryCity from "../topcategorycity/TopCategoryCity";
// import WhyChooseUs from "./WhyChooseUs";
// import CustomerReviews from "./CustomerReviews";
// import StickyFooter from "../trendingcategories/EnquiryFooter";

// // ─── SLUG HELPER ──────────────────────────────────────────────────
// function toSlug(name) {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");
// }

// // ─── HERO SLIDER ─────────────────────────────────────────────────
// function HeroSlider() {
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null);

//   const { banners, loading } = useSelector((state) => state.cityBanners);
//   const { cities, loading: citiesLoading } = useSelector(
//     (state) => state.cityDropdown,
//   );
//   const selectedCityFromRedux = useSelector(
//     (state) => state.location.selectedCity,
//   );

//   const [current, setCurrent] = useState(0);
//   const [animating, setAnimating] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [citySearch, setCitySearch] = useState("");

//   useEffect(() => {
//     dispatch(fetchHomeBanners());
//     dispatch(fetchCities());
//   }, [dispatch]);

//   const filteredCities = useMemo(() => {
//     const cityList = Array.isArray(cities) ? cities : [];
//     if (!citySearch) return cityList.slice(0, 100);
//     return cityList
//       .filter((city) =>
//         city?.name?.toLowerCase().includes(citySearch.toLowerCase()),
//       )
//       .slice(0, 100);
//   }, [cities, citySearch]);

//   const goTo = (index) => {
//     if (animating || !banners?.length) return;
//     setAnimating(true);
//     setTimeout(() => {
//       setCurrent(index);
//       setAnimating(false);
//     }, 200);
//   };

//   const next = () => goTo((current + 1) % banners.length);
//   const prev = () => goTo((current - 1 + banners.length) % banners.length);

//   useEffect(() => {
//     if (banners?.length > 0) {
//       const timer = setInterval(next, 1500);
//       return () => clearInterval(timer);
//     }
//   }, [current, banners?.length]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   if (loading && (!banners || banners.length === 0)) {
//     return (
//       <div className="w-full h-[50vh] sm:h-[60vh] flex items-center justify-center bg-gray-100">
//         <div className="flex flex-col items-center justify-center py-20">
//           <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[60vh] overflow-hidden">
//       {/* Banners */}
//       {banners?.map((s, i) => (
//         <div
//           key={s._id}
//           className="absolute inset-0 w-full h-full transition-opacity duration-700"
//           style={{
//             opacity: i === current ? 1 : 0,
//             zIndex: i === current ? 1 : 0,
//           }}
//         >
//           <img
//             src={s.bannerImage}
//             alt="Banner"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/55" />
//         </div>
//       ))}

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
//         <h1
//           className="text-white font-extrabold drop-shadow-lg leading-tight mb-2 sm:mb-3
//           text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl
//           max-w-[280px] xs:max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
//         >
//           India's No. 1 Local Search Engine
//         </h1>

//         <h2
//           className="text-white font-semibold drop-shadow mb-4 sm:mb-6
//           text-xs xs:text-sm sm:text-lg md:text-2xl lg:text-3xl
//           max-w-[260px] xs:max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl"
//         >
//           Find the Best Services &amp; Businesses Near You
//         </h2>

//         <button
//           className="
//           bg-black/60 hover:bg-black/80
//           border border-yellow-400 text-yellow-400
//           font-bold tracking-widest uppercase
//           transition-all rounded-full
//           text-[10px] xs:text-xs sm:text-sm
//           px-5 py-2 sm:px-7 sm:py-3 md:px-8 md:py-4
//         "
//         >
//           EXPLORE NOW
//         </button>
//       </div>

//       {/* Slider Prev/Next Controls */}
//       {banners?.length > 1 && (
//         <>
//           <button
//             onClick={prev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1 sm:p-1.5 transition-all"
//           >
//             <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//           </button>
//           <button
//             onClick={next}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1 sm:p-1.5 transition-all"
//           >
//             <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//           </button>
//         </>
//       )}

//       {/* Dot Indicators */}
//       {banners?.length > 1 && (
//         <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
//           {banners.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               className={`transition-all duration-300 rounded-full ${
//                 i === current
//                   ? "w-5 h-2 sm:w-6 sm:h-2.5 bg-orange-500"
//                   : "w-2 h-2 sm:w-2 sm:h-2.5 bg-white/60 hover:bg-white"
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── TRENDING CATEGORIES ──────────────────────────────────────────
// function TrendingCategories() {
//   const dispatch = useDispatch();
//   const { categories, loading, error } = useSelector(
//     (state) => state.categories,
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAllCategories());
//   }, [dispatch]);

//   return (
//     <section className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 bg-gray-50">
//       <div className="max-w-screen-xl mx-auto">
//         <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
//           Trending Categories <span className="text-orange-500">Near You</span>
//         </h2>

//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16 sm:py-20">
//             <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
//             <p className="mt-4 text-gray-500 text-sm font-medium text-center px-4">
//               Fetching Best Subcategory And Keywords For You...
//             </p>
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500 text-sm">{error}</p>
//         ) : (
//           <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
//             {categories?.map((cat) => (
//               <div
//                 key={cat.id}
//                 onClick={() =>
//                   navigate(`/subcategory/${toSlug(cat.name)}`, {
//                     state: { id: cat.id },
//                   })
//                 }
//                 className="group cursor-pointer relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
//                   <p className="text-white text-[11px] sm:text-xs md:text-sm font-bold truncate">
//                     {cat.name}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// // ─── HOME PAGE ────────────────────────────────────────────────────
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <HeroSlider />
//       <TrendingCategories />
//       <ListBusiness />
//       <TopRatedBusinesses />
//       <TopCategoryCity />
//       <CustomerReviews />
//       <WhyChooseUs />
//       {/* <StickyFooter /> */}
//     </div>
//   );
// }



import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import { fetchHomeBanners } from "../../../redux/slice/homecityBanner/getAllCityBanner";
import { fetchCities } from "../../../redux/slice/citydropdown/getCityDropdownSlice";

import ListBusiness from "../businesslisting/ListBusiness";
import TopRatedBusinesses from "../topratedbusiness/TopRatedBusinesses";
import TopCategoryCity from "../topcategorycity/TopCategoryCity";
import WhyChooseUs from "./WhyChooseUs";
import CustomerReviews from "./CustomerReviews";

const createSlug = (title = "") =>
  title.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function HeroSlider() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { banners, loading } = useSelector((state) => state.cityBanners);
  const { cities } = useSelector((state) => state.cityDropdown);

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    dispatch(fetchHomeBanners());
    dispatch(fetchCities());
  }, [dispatch]);

  const goTo = (index) => {
    if (animating || !banners?.length) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 200);
  };

  const next = () => goTo((current + 1) % banners.length);
  const prev = () => goTo((current - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (banners?.length > 0) {
      const timer = setInterval(next, 1500);
      return () => clearInterval(timer);
    }
  }, [current, banners?.length]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setCitySearch("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading && (!banners || banners.length === 0)) {
    return (
      <div className="w-full h-[50vh] sm:h-[60vh] flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[60vh] overflow-hidden">
      {banners?.map((s, i) => (
        <div
          key={s._id}
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img src={s.bannerImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        <h1 className="text-white font-extrabold drop-shadow-lg leading-tight mb-2 sm:mb-3 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-[280px] xs:max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          India's No. 1 Local Search Engine
        </h1>
        <h2 className="text-white font-semibold drop-shadow mb-4 sm:mb-6 text-xs xs:text-sm sm:text-lg md:text-2xl lg:text-3xl max-w-[260px] xs:max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl">
          Find the Best Services &amp; Businesses Near You
        </h2>
        <button className="bg-black/60 hover:bg-black/80 border border-yellow-400 text-yellow-400 font-bold tracking-widest uppercase transition-all rounded-full text-[10px] xs:text-xs sm:text-sm px-5 py-2 sm:px-7 sm:py-3 md:px-8 md:py-4">
          EXPLORE NOW
        </button>
      </div>

      {banners?.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1 sm:p-1.5 transition-all">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1 sm:p-1.5 transition-all">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {banners?.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-5 h-2 sm:w-6 sm:h-2.5 bg-orange-500"
                  : "w-2 h-2 sm:w-2 sm:h-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TrendingCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategoryClick = (cat) => {
    /*
      ✅ cateId use karo (CAT-004) — MongoDB _id nahi
      URL: /subcategory/CAT-004/electrician-service
    */
    const cateId = cat.cateId; // ✅ backend field: "cateId": "CAT-004"
    const slug = createSlug(cat.name || "");
    navigate(`/subcategory/${cateId}/${slug}`);
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
          Trending Categories <span className="text-orange-500">Near You</span>
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
            <p className="mt-4 text-gray-500 text-sm font-medium text-center px-4">
              Fetching Best Subcategory And Keywords For You...
            </p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">{error}</p>
        ) : (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories?.map((cat) => (
              <div
                key={cat._id || cat.id}
                onClick={() => handleCategoryClick(cat)}
                className="group cursor-pointer relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <p className="text-white text-[11px] sm:text-xs md:text-sm font-bold truncate">
                    {cat.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />
      <TrendingCategories />
      <ListBusiness />
      <TopRatedBusinesses />
      <TopCategoryCity />
      <CustomerReviews />
      <WhyChooseUs />
    </div>
  );
}