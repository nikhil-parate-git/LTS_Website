// import { useState, useRef, useEffect, useMemo } from "react";
// import { Search, Menu, User, MapPin, ChevronDown, Loader2 } from "lucide-react";
// import logo from "../../../src/assets/logo.png";
// import HamburgerDrawer from "./HamburgerDrawer";
// import { useNavigate } from "react-router-dom";
// import ProfileLogin from "../../pages/modules/profilelogin/ProfileLogin";
// import ProfileDropdown from "./ProfileDropdown";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCities } from "../../redux/slice/citydropdown/getCityDropdownSlice";
// import { setCity } from "../../redux/slice/locationSlice";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("Select City");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [citySearch, setCitySearch] = useState("");
//   const [visibleCount, setVisibleCount] = useState(50);

//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { cities, loading } = useSelector((state) => state.cityDropdown);
//   const selectedCityFromRedux = useSelector(
//     (state) => state.location.selectedCity,
//   );

//   useEffect(() => {
//     if (selectedCityFromRedux) {
//       setSelectedLocation(selectedCityFromRedux);
//     }
//   }, [selectedCityFromRedux]);

//   // City select hone par logic
//   const handleCitySelect = (cityName) => {
//     if (!cityName) return;
//     setSelectedLocation(cityName);
//     dispatch(setCity(cityName)); // Redux update
//     setDropdownOpen(false);
//     setCitySearch("");
//     setSearchQuery(""); // Input clear after selection
//   };

//   useEffect(() => {
//     dispatch(fetchCities());
//   }, [dispatch]);

//   // Filtering Logic
//   const filteredCities = useMemo(() => {
//     const cityList = Array.isArray(cities) ? cities : [];
//     const activeSearch = citySearch || searchQuery;
//     if (!activeSearch) return cityList;
//     return cityList.filter((city) =>
//       city?.name?.toLowerCase().includes(activeSearch.toLowerCase()),
//     );
//   }, [cities, citySearch, searchQuery]);

//   const displayCities = filteredCities.slice(0, visibleCount);

//   // 🔹 FIX: Enter press karne par wahi text select hoga jo user ne dala hai
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && searchQuery.trim() !== "") {
//       // Check karein ki kya user ka input kisi existing city se exact match karta hai
//       const exactMatch = cities.find(
//         (c) => c.name.toLowerCase() === searchQuery.toLowerCase(),
//       );

//       if (exactMatch) {
//         handleCitySelect(exactMatch.name);
//       } else {
//         // Agar exact match nahi hai, toh jo user ne likha hai wahi set kar do
//         handleCitySelect(searchQuery);
//       }
//     }
//   };

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     if (scrollHeight - scrollTop <= clientHeight + 20) {
//       if (visibleCount < filteredCities.length) {
//         setVisibleCount((prev) => prev + 50);
//       }
//     }
//   };

//   useEffect(() => {
//     setVisibleCount(50);
//   }, [citySearch, searchQuery, dropdownOpen]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.reload();
//   };

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <>
//       <div className="h-[60px] md:h-[64px]" />
//       <nav className="w-full bg-white px-3 md:px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow-sm">
//         <div className="w-full mx-auto flex items-center gap-2 md:gap-3">
//           <div className="cursor-pointer" onClick={() => navigate("/")}>
//             <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto" />
//           </div>

//           <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />

//           {/* Location Dropdown */}
//           <div className="relative hidden md:block" ref={dropdownRef}>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-1 text-gray-700 font-medium text-sm border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-all"
//             >
//               <MapPin className="w-4 h-4 text-orange-500" />
//               <span className="max-w-[120px] truncate">{selectedLocation}</span>
//               <ChevronDown
//                 className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
//               />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-72 overflow-hidden flex flex-col">
//                 <div className="p-3 border-gray-200 border-b bg-white">
//                   <input
//                     type="text"
//                     placeholder="Search from 4000+ cities..."
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400"
//                     value={citySearch || searchQuery}
//                     onChange={(e) => setCitySearch(e.target.value)}
//                     autoFocus
//                   />
//                 </div>
//                 <div
//                   className="max-h-[300px] overflow-y-auto cursor-pointer"
//                   onScroll={handleScroll}
//                 >
//                   {loading ? (
//                     <div className="p-8 text-center">
//                       <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
//                     </div>
//                   ) : displayCities.length > 0 ? (
//                     displayCities.map((city, index) => (
//                       <button
//                         key={`${city.name}-${index}`}
//                         onClick={() => handleCitySelect(city?.name)}
//                         className="w-full text-left px-4 py-2.5 text-sm cursor-pointer hover:bg-orange-50 flex items-center"
//                       >
//                         <MapPin className="w-3 h-3 text-gray-400 mr-2" />
//                         {city?.name}
//                       </button>
//                     ))
//                   ) : (
//                     <div className="p-8 text-center text-sm text-gray-500">
//                       No city found
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />

//           {/* 🔹 Central Search Input */}
//           <div className="hidden md:flex flex-1 items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder={`Search in ${selectedLocation}`}
//               className="flex-1 px-4 py-2 text-sm outline-none"
//             />
//             <button
//               onClick={() => handleKeyDown({ key: "Enter" })}
//               className="bg-orange-500 px-5 py-2 hover:bg-orange-600 transition-colors"
//             >
//               <Search className="w-5 h-5 text-white" />
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/contact")}
//               className="text-sm hover:text-orange-500 px-2"
//             >
//               Contact Us
//             </button>
//             <button
//               onClick={() => navigate("/about")}
//               className="text-sm hover:text-orange-500 px-2"
//             >
//               About
//             </button>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2 text-gray-600"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setProfileOpen(true)}
//               className={`p-1.5 rounded-full border ${localStorage.getItem("token") ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
//             >
//               <User className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <HamburgerDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
//       {profileOpen &&
//         (localStorage.getItem("token") ? (
//           <ProfileDropdown
//             onClose={() => setProfileOpen(false)}
//             onLogout={handleLogout}
//           />
//         ) : (
//           <ProfileLogin onClose={() => setProfileOpen(false)} />
//         ))}
//     </>
//   );
// }


import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Menu, User, MapPin, ChevronDown, Loader2 } from "lucide-react";
import logo from "../../../src/assets/logo.png";
import HamburgerDrawer from "./HamburgerDrawer";
import { useNavigate } from "react-router-dom";
import ProfileLogin from "../../pages/modules/profilelogin/ProfileLogin";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slice/citydropdown/getCityDropdownSlice";
import { setCity } from "../../redux/slice/locationSlice";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cities, loading } = useSelector((state) => state.cityDropdown);
  const selectedCityFromRedux = useSelector(
    (state) => state.location.selectedCity,
  );

  useEffect(() => {
    if (selectedCityFromRedux) {
      setSelectedLocation(selectedCityFromRedux);
    }
  }, [selectedCityFromRedux]);

  const handleCitySelect = (cityName) => {
    if (!cityName) return;
    setSelectedLocation(cityName);
    dispatch(setCity(cityName));
    setDropdownOpen(false);
    setCitySearch("");
    setSearchQuery("");
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const filteredCities = useMemo(() => {
    const cityList = Array.isArray(cities) ? cities : [];
    const activeSearch = citySearch || searchQuery;
    if (!activeSearch) return cityList;
    return cityList.filter((city) =>
      city?.name?.toLowerCase().includes(activeSearch.toLowerCase()),
    );
  }, [cities, citySearch, searchQuery]);

  const displayCities = filteredCities.slice(0, visibleCount);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      const exactMatch = cities.find(
        (c) => c.name.toLowerCase() === searchQuery.toLowerCase(),
      );

      if (exactMatch) {
        handleCitySelect(exactMatch.name);
      } else {
        handleCitySelect(searchQuery);
      }
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      if (visibleCount < filteredCities.length) {
        setVisibleCount((prev) => prev + 50);
      }
    }
  };

  useEffect(() => {
    setVisibleCount(50);
  }, [citySearch, searchQuery, dropdownOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className="h-[60px] md:h-[64px]" />
      <nav className="w-full bg-white px-3 md:px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="w-full mx-auto flex items-center gap-2 md:gap-3">
          {/* Logo */}
          <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto" />
          </div>

          <div className="hidden md:block h-8 w-px bg-gray-200 mx-1 flex-shrink-0" />

          {/* Location Dropdown */}
          <div className="relative hidden md:block flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-700 font-medium text-sm border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-all"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="max-w-[100px] truncate">{selectedLocation}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-72 overflow-hidden flex flex-col">
                <div className="p-3 border-gray-200 border-b bg-white">
                  <input
                    type="text"
                    placeholder="Search from 4000+ cities..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400"
                    value={citySearch || searchQuery}
                    onChange={(e) => setCitySearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div
                  className="max-h-[300px] overflow-y-auto cursor-pointer"
                  onScroll={handleScroll}
                >
                  {loading ? (
                    <div className="p-8 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
                    </div>
                  ) : displayCities.length > 0 ? (
                    displayCities.map((city, index) => (
                      <button
                        key={`${city.name}-${index}`}
                        onClick={() => handleCitySelect(city?.name)}
                        className="w-full text-left px-4 py-2.5 text-sm cursor-pointer hover:bg-orange-50 flex items-center"
                      >
                        <MapPin className="w-3 h-3 text-gray-400 mr-2" />
                        {city?.name}
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-sm text-gray-500">
                      No city found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block h-8 w-px bg-gray-200 mx-1 flex-shrink-0" />

          {/* 🔹 Search Box — smaller/compact size */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 w-[260px] lg:w-[640px] p-1 flex-shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search in ${selectedLocation}`}
              className="flex-1 px-3 py-1.5 text-sm outline-none min-w-0"
            />
            {/* <button
              onClick={() => handleKeyDown({ key: "Enter" })}
              className="bg-orange-500 px-3 py-1.5 hover:bg-orange-600 transition-colors flex-shrink-0"
            >
              <Search className="w-4 h-4 text-white" />
            </button> */}
          </div>

          {/* Right Side Nav Items */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* 🔹 List Your Business Button */}
            
{/* 
            <button
  onClick={() => window.open("https://vendor.localtradestreet.com/login", "_blank")}
  className="hidden cursor-pointer md:inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all rounded-lg px-3 py-1.5 whitespace-nowrap animate-pulse shadow-lg shadow-orange-500/50"
>
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
  </span>
  Listing Your Business
</button> */}

<button
  onClick={() => window.open("https://vendor.localtradestreet.com/signin", "_blank")}
  className="
    group relative overflow-hidden
    hidden cursor-pointer md:inline-flex items-center gap-2.5 
    text-[11px] uppercase tracking-wider font-bold text-white 
    rounded-lg px-4 py-2 whitespace-nowrap
    transition-all duration-500
    hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]
    hover:scale-[1.02] active:scale-95
    bg-[linear-gradient(45deg,#f97316,#ea580c,#f97316)]
    bg-[length:200%_auto]
  "
  style={{
    animation: "gradientMove 3s ease infinite",
  }}
>
  {/* Keyframes Injection (Bina CSS file ke animation enable karne ke liye) */}
  <style>
    {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes shimmerSweep {
        0% { left: -100%; }
        100% { left: 200%; }
      }
    `}
  </style>

  {/* Live Status Dot */}
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_10px_#fff]"></span>
  </span>

  <span className="relative z-10">
    Listing Your Business
  </span>

  {/* Shimmer Effect - Chamakne wali line */}
  <div 
    className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
    style={{
      animation: "shimmerSweep 2.5s infinite ease-in-out",
    }}
  />
</button>

            <button
              onClick={() => navigate("/contact")}
              className="hidden cursor-pointer lg:block text-base hover:text-orange-500 px-2"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hidden cursor-pointer lg:block text-base hover:text-orange-500 px-2"
            >
              About
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className={`p-1.5 rounded-full border ${localStorage.getItem("token") ? "border-orange-500 bg-orange-50" : "border-gray-200"}`}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <HamburgerDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {profileOpen &&
        (localStorage.getItem("token") ? (
          <ProfileDropdown
            onClose={() => setProfileOpen(false)}
            onLogout={handleLogout}
          />
        ) : (
          <ProfileLogin onClose={() => setProfileOpen(false)} />
        ))}
    </>
  );
}