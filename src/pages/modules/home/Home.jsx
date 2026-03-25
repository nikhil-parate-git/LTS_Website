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
import StickyFooter from "../trendingcategories/EnquiryFooter";

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
       <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-15 w-15 border-b-3 border-orange-500"></div>
        </div>
      </div>
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
                    className="w-full px-3 py-1.5 text-sm border  rounded-xl outline-none focus:border-orange-400"
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
           <div className="min-h-screen">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-15 w-15 border-b-3 border-orange-500"></div>
          <p className="mt-4 text-gray-500 font-medium">
            Fetching Best Subcategory And Keywords For You...
          </p>
        </div>
      </div>
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
      {/* <StickyFooter/> */}
    </div>
  );
}