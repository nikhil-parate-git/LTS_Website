// import { useState, useRef, useEffect } from "react";
// import { Mic, Search, Menu, User, MapPin, ChevronDown, X } from "lucide-react";
// import logo from "../../../src/assets/logo.png";
// import HamburgerDrawer from "./HamburgerDrawer";
// import { useNavigate } from "react-router-dom";
// import ProfileLogin from "../../pages/modules/profilelogin/ProfileLogin";
// import ProfileDropdown from "./ProfileDropdown"; // Naya component jo humne create kiya

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

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(locations[0]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   // Check login status on mount and when profile modal/dropdown state changes
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };
//     checkAuth();
//     // Listen for storage changes from other tabs
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, [profileOpen]);

//   const handleMic = () => setIsListening((prev) => !prev);

//   const handleProfileClick = () => {
//     setProfileOpen(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setProfileOpen(false);
//     window.location.reload();
//     // navigate("/");
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <>
//       {/* Spacer so content doesn't hide behind fixed navbar */}
//       <div className="h-[60px] md:h-[64px]" />

//       <nav className="w-full bg-white px-3 md:px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow-sm">
//         <div className="w-full mx-auto flex items-center gap-2 md:gap-3">
//           {/* Logo */}
//           <div
//             className="flex items-center shrink-0 select-none cursor-pointer"
//             onClick={() => navigate("/")}
//           >
//             <img
//               src={logo}
//               alt="Local Trade Street Logo"
//               className="h-9 md:h-10 w-auto object-contain"
//             />
//           </div>

//           <div className="hidden md:block h-8 w-px bg-gray-300 mx-1" />

//           {/* Location Dropdown */}
//           <div className="relative hidden md:block shrink-0" ref={dropdownRef}>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-1 text-gray-700 font-medium text-sm whitespace-nowrap hover:text-orange-500 transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
//             >
//               <MapPin className="w-4 h-4 text-orange-500" />
//               <span className="max-w-[130px] truncate">{selectedLocation}</span>
//               <ChevronDown
//                 className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
//               />
//             </button>

//             {dropdownOpen && (
//               <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-52 max-h-64 overflow-y-auto">
//                 {locations.map((loc) => (
//                   <button
//                     key={loc}
//                     onClick={() => {
//                       setSelectedLocation(loc);
//                       setDropdownOpen(false);
//                     }}
//                     className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${
//                       selectedLocation === loc
//                         ? "text-orange-500 font-semibold bg-orange-50"
//                         : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
//                     }`}
//                   >
//                     <MapPin className="w-3 h-3 shrink-0" />
//                     {loc}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="hidden md:block h-8 w-px bg-gray-300 mx-1" />

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder={`Search in ${selectedLocation}`}
//               className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//             />
//             <button
//               onClick={handleMic}
//               className={`p-2 transition-colors ${isListening ? "text-red-500" : "text-pink-500 hover:text-pink-600"}`}
//               title="Voice Search"
//             >
//               <Mic className="w-5 h-5" />
//             </button>
//             <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 flex items-center justify-center">
//               <Search className="w-5 h-5 text-white" />
//             </button>
//           </div>

//           {/* Mobile Search icon */}
//           <button
//             onClick={() => setMobileSearchOpen(true)}
//             className="md:hidden ml-auto p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700"
//           >
//             <Search className="w-5 h-5" />
//           </button>

//           {/* Right Actions */}
//           <div className="flex items-center gap-1 lg:gap-3 shrink-0 md:ml-2">
//             <button onClick={() => navigate("/about")} className="hidden cursor-pointer lg:block text-orange-400 font-medium text-lg px-3 py-1.5 rounded hover:text-black transition-colors whitespace-nowrap">
//               About Us
//             </button>

//             <button onClick={() => navigate("/contact")} className="hidden cursor-pointer lg:block text-gray-700 font-medium text-lg px-3 py-1.5 rounded hover:text-orange-500 transition-colors whitespace-nowrap">
//               Contact Us
//             </button>

//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700"
//             >
//               <Menu className="w-5 h-5" />
//             </button>

//             {/* Profile Icon Button */}
//             <button
//               onClick={handleProfileClick}
//               className={`p-1.5 rounded-full border transition-all ${
//                 isLoggedIn ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:bg-gray-100"
//               } text-gray-700`}
//             >
//               <User className={`w-5 h-5 ${isLoggedIn ? "text-orange-600" : ""}`} />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Expandable Bar */}
//         {mobileSearchOpen && (
//           <div className="md:hidden mt-2 flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 transition-all">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search businesses..."
//               autoFocus
//               className="flex-1 px-4 py-2 text-sm text-gray-700 outline-none bg-transparent"
//             />
//             <button onClick={() => setMobileSearchOpen(false)} className="px-3 py-2 text-gray-400">
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </nav>

//       <HamburgerDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

//       {/* Auth UI Logic */}
//       {profileOpen && (
//         isLoggedIn ? (
//           <ProfileDropdown
//             onClose={() => setProfileOpen(false)}
//             onLogout={handleLogout}
//           />
//         ) : (
//           <ProfileLogin onClose={() => setProfileOpen(false)} />
//         )
//       )}
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

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slice/citydropdown/getCityDropdownSlice";
import { setCity } from "../../redux/slice/locationSlice";
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50); // Lazy loading state

  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null); // Ref for scroll detection

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

  // City select hone par logic
  const handleCitySelect = (cityName) => {
    setSelectedLocation(cityName);
    dispatch(setCity(cityName)); // Global state update
    setDropdownOpen(false);
    setCitySearch("");
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Filtering Logic
  const filteredCities = useMemo(() => {
    const cityList = Array.isArray(cities) ? cities : [];
    if (!citySearch) return cityList;
    return cityList.filter((city) =>
      city?.name?.toLowerCase().includes(citySearch.toLowerCase()),
    );
  }, [cities, citySearch]);

  const displayCities = filteredCities.slice(0, visibleCount);

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
  }, [citySearch, dropdownOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="h-[60px] md:h-[64px]" />
      <nav className="w-full bg-white px-3 md:px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="w-full mx-auto flex items-center gap-2 md:gap-3">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto" />
          </div>

          <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />

          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-700 font-medium text-sm border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-all"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="max-w-[120px] truncate">{selectedLocation}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 cursor-pointer bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-72 overflow-hidden flex flex-col">
                <div className="p-3 border-gray-200 border-b bg-white">
                  <input
                    type="text"
                    placeholder="Search from 4000+ cities..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    autoFocus
                  />
                </div>
                <div
                  className="max-h-[300px] overflow-y-auto cursor-pointer overscroll-contain"
                  onScroll={handleScroll}
                >
                  {loading ? (
                    <div className="p-8 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
                    </div>
                  ) : displayCities.length > 0 ? (
                    <>
                      {displayCities.map((city, index) => (
                        // <button
                        //   key={`${city.name}-${index}`}
                        //   onClick={() => {
                        //     setSelectedLocation(city?.name);
                        //     setDropdownOpen(false);
                        //     setCitySearch("");
                        //   }}
                        //   className="w-full text-left px-4 py-2.5 text-sm cursor-pointer hover:bg-orange-50 flex items-center"
                        // >
                        //   <MapPin className="w-3 h-3 text-gray-400 cursor-pointer " />
                        //   {city?.name}
                        // </button>

                        <button
                          key={`${city.name}-${index}`}
                          onClick={() => handleCitySelect(city?.name)} // <--- Local function call karein
                          className="w-full text-left px-4 py-2.5 text-sm cursor-pointer hover:bg-orange-50 flex items-center"
                        >
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {city?.name}
                        </button>
                      ))}

                      {visibleCount < filteredCities.length && (
                        <div className="p-3 text-center text-[10px] text-gray-400 animate-pulse">
                          Scrolling for more...
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-8 text-center text-sm text-gray-500">
                      No city found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block h-8 w-px bg-gray-200 mx-1" />

          <div className="hidden md:flex flex-1 items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${selectedLocation}`}
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-orange-500 px-5 py-2 hover:bg-orange-600 transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3">
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
