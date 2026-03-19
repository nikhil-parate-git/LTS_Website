// import { useState, useEffect, useRef, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
// import { fetchHomeBanners } from "../../../redux/slice/homecityBanner/getAllCityBanner";
// // for city dropdown
// import { fetchCities } from "../../../redux/slice/citydropdown/getCityDropdownSlice";
// import { setCity } from "../../../redux/slice/locationSlice";
// import {
//   MapPin,
//   Mic,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   Loader2,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import ListBusiness from "../businesslisting/ListBusiness";
// import TopRatedBusinesses from "../topratedbusiness/TopRatedBusinesses";
// import TopCategoryCity from "../topcategorycity/TopCategoryCity";
// import WhyChooseUs from "./WhyChooseUs";
// import CustomerReviews from "./CustomerReviews";

// const locations = [
//   "Nagpur (Nagpur NCR)",
//   "Mumbai",
//   "Bangalore",
//   "Chennai",
//   "Hyderabad",
//   "Pune",
//   "Kolkata",
//   "Nagpur",
//   "Ahmedabad",
//   "Jaipur",
// ];

// // ─── HERO SLIDER ── (Integrated with Redux) ────────────────────────
// function HeroSlider() {
//   const dispatch = useDispatch();
//   const { banners, loading, error } = useSelector((state) => state.cityBanners);
//   const { cities, loading: citiesLoading } = useSelector((state) => state.cityDropdown);
//   const selectedCityFromRedux = useSelector((state) => state.location.selectedCity);

//   // const [current, setCurrent] = useState(0);
//   // const [animating, setAnimating] = useState(false);
//   // const [selectedLocation, setSelectedLocation] = useState(locations[0]);
//   // const [dropdownOpen, setDropdownOpen] = useState(false);
//   // const dropdownRef = useRef(null);


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
//     if (!citySearch) return cityList.slice(0, 100); // Limit initial view
//     return cityList
//       .filter((city) =>
//         city?.name?.toLowerCase().includes(citySearch.toLowerCase())
//       )
//       .slice(0, 100);
//   }, [cities, citySearch]);

//   // const goTo = (index) => {
//   //   if (animating || !banners.length) return;
//   //   setAnimating(true);
//   //   setTimeout(() => {
//   //     setCurrent(index);
//   //     setAnimating(false);
//   //   }, 400);
//   // };



//   const goTo = (index) => {
//     if (animating || !banners.length) return;
//     setAnimating(true);
//     setTimeout(() => {
//       setCurrent(index);
//       setAnimating(false);
//     }, 400);
//   };

//   const prev = () => goTo((current - 1 + banners.length) % banners.length);
//   const next = () => goTo((current + 1) % banners.length);

//   useEffect(() => {
//     if (banners.length > 0) {
//       const timer = setInterval(next, 5000);
//       return () => clearInterval(timer);
//     }
//   }, [current, banners.length]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   if (loading && banners.length === 0) {
//     return (
//       <div className="w-full h-[60vh] flex items-center justify-center bg-gray-100">
//         <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
//       </div>
//     );
//   }

//   // Static content because API only provides images
//   const staticContent = {
//     title: "India's No. 1 Local Search Engine",
//     subtitle: "Find the Best Services & Businesses Near You",
//     cta: "EXPLORE NOW",
//   };

//   return (
//     <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[60vh] overflow-hidden">
//       {banners.map((s, i) => (
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

//       <div
//         className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 text-center"
//         style={{
//           opacity: animating ? 0 : 1,
//           transform: animating ? "translateY(16px)" : "translateY(0)",
//           transition: "opacity 0.4s ease, transform 0.4s ease",
//         }}
//       >
//         <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 drop-shadow-lg leading-tight">
//           {staticContent.title}
//         </h1>

//         <div className="flex items-center bg-white rounded-xl overflow-visible shadow-2xl w-full max-w-xs sm:max-w-lg md:max-w-2xl mb-5 md:mb-8 relative">
//           <div className="relative shrink-0 hidden sm:block" ref={dropdownRef}>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-1 px-3 md:px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
//             >
//               <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
//               <span className="text-gray-700 font-semibold text-xs md:text-sm max-w-[90px] md:max-w-[140px] truncate">
//                 {selectedLocation}
//               </span>
//               <ChevronDown
//                 className={`w-3 h-3 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
//               />
//             </button>
//             {dropdownOpen && (
//               <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-52 max-h-60 overflow-y-auto">
//                 {locations.map((loc) => (
//                   <button
//                     key={loc}
//                     onClick={() => {
//                       setSelectedLocation(loc);
//                       setDropdownOpen(false);
//                     }}
//                     className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2 ${selectedLocation === loc ? "text-orange-500 font-semibold bg-orange-50" : "text-gray-700"}`}
//                   >
//                     <MapPin className="w-3 h-3 shrink-0" />
//                     {loc}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* <input
//             type="text"
//             placeholder={`Search here fro in ${selectedLocation}`}
//             className="flex-1 px-3 md:px-4 py-3 text-gray-700 text-xs md:text-sm outline-none bg-transparent placeholder-gray-400"
//           /> */}
//          <input
//                     type="text"
//                     placeholder="Search city..."
//                     className="w-full px-3 py-1.5 text-sm border rounded-lg outline-none focus:border-orange-400"
//                     value={citySearch}
//                     onChange={(e) => setCitySearch(e.target.value)}
//                     autoFocus
//                   />
//           <button className="p-2 md:p-3 text-pink-500 hover:text-pink-600 transition-colors">
//             <Mic className="w-4 h-4 md:w-5 md:h-5" />
//           </button>
//           <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-3 md:px-5 py-3 rounded-r-xl">
//             <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
//           </button>
//         </div>

//         <h2 className="text-white text-sm sm:text-xl md:text-3xl font-bold mb-4 md:mb-5 max-w-xs sm:max-w-xl md:max-w-2xl leading-snug drop-shadow px-2">
//           {staticContent.subtitle}
//         </h2>

//         <button className="bg-black/60 hover:bg-black/80 border border-yellow-400 text-yellow-400 font-bold text-[9px] sm:text-xs md:text-sm tracking-widest uppercase px-4 sm:px-6 md:px-8 py-2.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
//           {staticContent.cta}
//         </button>
//       </div>

//       {banners.length > 1 && (
//         <>
//           <button
//             onClick={prev}
//             className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1.5 md:p-2 transition-all"
//           >
//             <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//           </button>
//           <button
//             onClick={next}
//             className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1.5 md:p-2 transition-all"
//           >
//             <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//           </button>

//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//             {banners.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goTo(i)}
//                 className={`rounded-full transition-all duration-300 ${i === current ? "bg-orange-500 w-6 h-2.5" : "bg-white/60 hover:bg-white w-2.5 h-2.5"}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // ─── CATEGORY CARD ─────────────────────────────────────────────
// function CategoryCard({ category }) {
//   const navigate = useNavigate();
//   const categoryImage =
//     category.image || "https://via.placeholder.com/300x200?text=Category";

//   return (
//     <div
//       onClick={() => navigate(`/subcategory/${category.id}`)}
//       className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//       style={{ aspectRatio: "4/3" }}
//     >
//       <img
//         src={categoryImage}
//         alt={category.name}
//         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//       <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
//       <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
//         <p className="text-white text-xs md:text-sm font-bold leading-snug drop-shadow group-hover:text-orange-300 transition-colors duration-200">
//           {category.name}
//         </p>
//         <p className="text-orange-400 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
//           Explore →
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── TRENDING CATEGORIES ───────────────────────────────────────
// function TrendingCategories() {
//   const dispatch = useDispatch();
//   const { categories, loading, error } = useSelector((state) => state.categories);

//   useEffect(() => {
//     dispatch(fetchAllCategories());
//   }, [dispatch]);

//   return (
//     <section className="py-10 md:py-12 px-4 sm:px-6 md:px-10 bg-gray-50">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="flex items-center justify-center mb-6 md:mb-8">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
//             Trending Categories <span className="text-orange-500">Near You</span>
//           </h2>
//         </div>

//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
//           </div>
//         )}

//         {error && <p className="text-center text-red-500">{error}</p>}

//         {!loading && !error && (!categories || categories.length === 0) && (
//           <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
//             <div className="bg-gray-50 p-4 rounded-full mb-4">
//               <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//               </svg>
//             </div>
//             <p className="text-lg font-semibold text-gray-600">No Categories available</p>
//           </div>
//         )}

//         {!loading && !error && categories?.length > 0 && (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
//             {categories.map((cat) => (
//               <CategoryCard key={cat._id || cat.id} category={cat} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

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
//     </div>
//   );
// }








import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Mic,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Loader2,
} from "lucide-react";

// Redux Actions
import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import { fetchHomeBanners } from "../../../redux/slice/homecityBanner/getAllCityBanner";
import { fetchCities } from "../../../redux/slice/citydropdown/getCityDropdownSlice";
import { setCity } from "../../../redux/slice/locationSlice";

// Components
import ListBusiness from "../businesslisting/ListBusiness";
import TopRatedBusinesses from "../topratedbusiness/TopRatedBusinesses";
import TopCategoryCity from "../topcategorycity/TopCategoryCity";
import WhyChooseUs from "./WhyChooseUs";
import CustomerReviews from "./CustomerReviews";

// ─── HERO SLIDER ─────────────────────────────────────────────────
function HeroSlider() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null); // Fixed: Added back the missing ref

  // Redux States
  const { banners, loading } = useSelector((state) => state.cityBanners);
  const { cities, loading: citiesLoading } = useSelector((state) => state.cityDropdown);
  const selectedCityFromRedux = useSelector((state) => state.location.selectedCity);

  // Local States
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    dispatch(fetchHomeBanners());
    dispatch(fetchCities());
  }, [dispatch]);

  // Filter Cities from API based on search input
  const filteredCities = useMemo(() => {
    const cityList = Array.isArray(cities) ? cities : [];
    if (!citySearch) return cityList.slice(0, 100);
    return cityList
      .filter((city) =>
        city?.name?.toLowerCase().includes(citySearch.toLowerCase())
      )
      .slice(0, 100);
  }, [cities, citySearch]);

  const goTo = (index) => {
    if (animating || !banners?.length) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  };

  const next = () => goTo((current + 1) % banners.length);
  const prev = () => goTo((current - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (banners?.length > 0) {
      const timer = setInterval(next, 1500);
      return () => clearInterval(timer);
    }
  }, [current, banners?.length]);

  // Click outside to close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading && (!banners || banners.length === 0)) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] md:h-[60vh] overflow-hidden">
      {/* Banners */}
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

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight">
          India's No. 1 Local Search Engine
        </h1>

        {/* Search Bar Container */}
        <div className="flex items-center bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-lg md:max-w-2xl mb-5 relative">
          
          {/* City Dropdown */}
          <div className="relative shrink-0 hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 md:px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-gray-700 font-semibold text-xs md:text-sm max-w-[90px] md:max-w-[140px] truncate">
                {selectedCityFromRedux || "Select City"}
              </span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 w-64 overflow-hidden flex flex-col">
                <div className="p-2 border-b">
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full px-3 py-1.5 text-sm border rounded-lg outline-none focus:border-orange-400"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {citiesLoading ? (
                    <div className="p-4 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-orange-500" /></div>
                  ) : filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={city._id}
                        onClick={() => {
                          dispatch(setCity(city.name));
                          setDropdownOpen(false);
                          setCitySearch("");
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 flex items-center gap-2 ${selectedCityFromRedux === city.name ? "text-orange-600 bg-orange-50 font-bold" : "text-gray-700"}`}
                      >
                        <MapPin className="w-3 h-3 opacity-50" />
                        {city.name}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-500">No cities found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Service Search Input */}
          <input
            type="text"
            placeholder={`Search services in ${selectedCityFromRedux || "your city"}...`}
            className="flex-1 px-3 md:px-4 py-3 text-gray-700 text-xs md:text-sm outline-none bg-transparent"
          />
          
          <button className="p-2 md:p-3 text-pink-500 hover:text-pink-600"><Mic className="w-4 h-4 md:w-5 md:h-5" /></button>
          <button className="bg-orange-500 hover:bg-orange-600 px-3 md:px-5 py-3 rounded-r-xl">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>

        <h2 className="text-white text-sm sm:text-xl md:text-3xl font-bold mb-4 drop-shadow">
          Find the Best Services & Businesses Near You
        </h2>

        <button className="bg-black/60 hover:bg-black/80 border border-yellow-400 text-yellow-400 font-bold text-[9px] sm:text-xs md:text-sm tracking-widest uppercase px-6 py-2.5 md:py-4 rounded-full transition-all">
          EXPLORE NOW
        </button>
      </div>

      {/* Slider Controls */}
      {banners?.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1.5 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-1.5 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

       {banners?.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-6 h-2.5 bg-orange-500"
                  : "w-2 h-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
         
    </div>
  );
}

// ─── TRENDING CATEGORIES ───────────────────────────────────────
function TrendingCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <section className="py-10 md:py-12 px-4 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Trending Categories <span className="text-orange-500">Near You</span>
        </h2>

        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-10 h-10 text-orange-500 animate-spin" /></div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/subcategory/${cat.id}`)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-square"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs md:text-sm font-bold truncate">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────
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