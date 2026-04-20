import { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  Menu,
  User,
  MapPin,
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";
import logo from "../../../src/assets/logo.png";
import HamburgerDrawer from "./HamburgerDrawer";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCityOpen, setMobileCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
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
    setMobileCityOpen(false);
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
  }, [citySearch, searchQuery, dropdownOpen, mobileCityOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen || mobileCityOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSearchOpen, mobileCityOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const CityList = ({ onSelect }) => (
    <>
      {loading ? (
        <div className="p-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
        </div>
      ) : displayCities.length > 0 ? (
        displayCities.map((city, index) => (
          <button
            key={`${city.name}-${index}`}
            onClick={() => onSelect(city?.name)}
            className="w-full text-left px-4 py-3 text-sm cursor-pointer hover:bg-orange-50 active:bg-orange-100 flex items-center transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
            {city?.name}
          </button>
        ))
      ) : (
        <div className="p-8 text-center text-sm text-gray-500">
          No city found
        </div>
      )}
    </>
  );

  const navLinks = [
    { label: "Services", path: "/navservice" },
    { label: "Blogs", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  return (
    <>
      <div className="h-[96px] sm:h-[96px] md:h-[64px]" />

      <nav
        className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-sm"
        aria-label="Main Navigation"
      >
        {/* ROW 1 */}
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-2">
          <div className="max-w-[1400px] mx-auto flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            {/* Logo: Changed to Link for SEO crawling */}
            <Link
              to="/"
              className="flex-shrink-0"
              aria-label="Local Trade Street Home"
            >
              <img
                src={logo}
                alt="Local Trade Street - Connect with Local Services"
                className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto"
              />
            </Link>

            <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

            {/* DESKTOP: Location Dropdown */}
            <div
              className="relative hidden md:block flex-shrink-0"
              ref={dropdownRef}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1 text-gray-700 font-medium text-xs lg:text-sm border rounded-lg px-2 lg:px-3 py-1.5 hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-orange-500 flex-shrink-0" />
                <span className="max-w-[70px] lg:max-w-[110px] xl:max-w-[140px] truncate">
                  {selectedLocation}
                </span>
                <ChevronDown
                  className={`w-3 h-3 flex-shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-64 lg:w-72 overflow-hidden flex flex-col">
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
                    <CityList onSelect={handleCitySelect} />
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

            {/* DESKTOP: Search */}
            <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 flex-1 min-w-0 p-1">
              <label htmlFor="desktop-search" className="sr-only">
                Search Services
              </label>
              <input
                id="desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Search in ${selectedLocation}`}
                className="flex-1 px-2 lg:px-3 py-1.5 text-xs lg:text-sm outline-none min-w-0"
              />
              <button
                aria-label="Search Submit"
                className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors flex-shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* MOBILE: Search + City icons */}
            <div className="flex md:hidden items-center gap-1 ml-auto">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileCityOpen(true)}
                className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 border rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors max-w-[110px]"
                aria-label="Select city"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span className="truncate">{selectedLocation}</span>
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-1 lg:gap-2 ml-2 flex-shrink-0">
              {/* List Your Business - Kept as button because it's an external window.open action */}
              <button
                onClick={() =>
                  window.open(
                    "https://vendor.localtradestreet.com/signin",
                    "_blank",
                  )
                }
                className="group relative overflow-hidden hidden cursor-pointer md:inline-flex items-center gap-1.5 lg:gap-2.5 text-[9px] lg:text-[11px] uppercase tracking-wider font-bold text-white rounded-lg px-2 md:px-2.5 lg:px-4 py-2 whitespace-nowrap transition-all duration-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-95 bg-[linear-gradient(45deg,#f97316,#ea580c,#f97316)] bg-[length:200%_auto]"
                style={{ animation: "gradientMove 3s ease infinite" }}
              >
                <span className="relative flex h-1.5 w-1.5 lg:h-2 lg:w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 bg-white"></span>
                </span>
                <span className="relative z-10">Listing Your Business</span>
              </button>

              {/* DESKTOP Nav Links - Using NavLink for SEO crawling & Active state */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `hidden xl:block text-xs lg:text-sm px-1 lg:px-2 py-1 font-medium transition-colors duration-200 rounded-md
                    ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open Menu"
                className="p-1.5 lg:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              <button
                onClick={() => setProfileOpen(true)}
                aria-label="User Profile"
                className={`p-1.5 rounded-full border flex-shrink-0 transition-colors hover:bg-gray-50 ${
                  localStorage.getItem("token")
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Mobile Nav Links */}
        <div className="md:hidden border-t border-gray-100 bg-white px-3 py-1.5">
          <div className="flex items-center justify-around">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-[11px] font-medium px-2 py-1 rounded-md transition-colors
                  ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600 hover:text-orange-500"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() =>
                window.open(
                  "https://vendor.localtradestreet.com/signin",
                  "_blank",
                )
              }
              className="text-[11px] font-bold text-orange-500 px-2 py-1 rounded-md border border-orange-400"
            >
              List Business
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE Search Overlay - Added labels for SEO and accessibility */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col md:hidden">
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-200">
            <div className="flex items-center border border-orange-400 rounded-lg bg-white flex-1 px-3 py-2 gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  if (e.key === "Enter") setMobileSearchOpen(false);
                }}
                placeholder={`Search in ${selectedLocation}`}
                className="flex-1 text-sm outline-none"
                autoFocus
              />
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-sm font-medium text-orange-500"
            >
              Cancel
            </button>
          </div>
          {/* ... Popular searches part remains same ... */}
        </div>
      )}

      {/* Other Modals (City Bottom Sheet, Hamburger, Profile) remain same */}
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


// import { useState, useRef, useEffect, useMemo } from "react";
// import {
//   Search,
//   Menu,
//   User,
//   MapPin,
//   ChevronDown,
//   Loader2,
//   X,
// } from "lucide-react";
// import logo from "../../../src/assets/logo.png";
// import HamburgerDrawer from "./HamburgerDrawer";
// import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
// import ProfileLogin from "../../pages/modules/profilelogin/ProfileLogin";
// import ProfileDropdown from "./ProfileDropdown";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCities } from "../../redux/slice/citydropdown/getCityDropdownSlice";
// import { setCity } from "../../redux/slice/locationSlice";
// import AddVendorForm from "../../components/nav/AddVendorForm";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("Select City");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [citySearch, setCitySearch] = useState("");
//   const [visibleCount, setVisibleCount] = useState(50);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const [mobileCityOpen, setMobileCityOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [vendorFormOpen, setVendorFormOpen] = useState(false);

//   const dropdownRef = useRef(null);
//   const mobileDropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
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

//   const handleCitySelect = (cityName) => {
//     if (!cityName) return;
//     setSelectedLocation(cityName);
//     dispatch(setCity(cityName));
//     setDropdownOpen(false);
//     setMobileCityOpen(false);
//     setCitySearch("");
//     setSearchQuery("");
//   };

//   useEffect(() => {
//     dispatch(fetchCities());
//   }, [dispatch]);

//   const filteredCities = useMemo(() => {
//     const cityList = Array.isArray(cities) ? cities : [];
//     const activeSearch = citySearch || searchQuery;
//     if (!activeSearch) return cityList;
//     return cityList.filter((city) =>
//       city?.name?.toLowerCase().includes(activeSearch.toLowerCase()),
//     );
//   }, [cities, citySearch, searchQuery]);

//   const displayCities = filteredCities.slice(0, visibleCount);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && searchQuery.trim() !== "") {
//       const exactMatch = cities.find(
//         (c) => c.name.toLowerCase() === searchQuery.toLowerCase(),
//       );
//       if (exactMatch) {
//         handleCitySelect(exactMatch.name);
//       } else {
//         handleCitySelect(searchQuery);
//       }
//     }
//   };

//   const handleListingClick = () => {
//     setVendorFormOpen(true);
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
//   }, [citySearch, searchQuery, dropdownOpen, mobileCityOpen]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//       if (
//         mobileDropdownRef.current &&
//         !mobileDropdownRef.current.contains(e.target)
//       ) {
//         setMobileCityOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (mobileSearchOpen || mobileCityOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileSearchOpen, mobileCityOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.reload();
//   };

//   const CityList = ({ onSelect }) => (
//     <>
//       {loading ? (
//         <div className="p-8 text-center">
//           <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
//         </div>
//       ) : displayCities.length > 0 ? (
//         displayCities.map((city, index) => (
//           <button
//             key={`${city.name}-${index}`}
//             onClick={() => onSelect(city?.name)}
//             className="w-full text-left px-4 py-3 text-sm cursor-pointer hover:bg-orange-50 active:bg-orange-100 flex items-center transition-colors"
//           >
//             <MapPin className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
//             {city?.name}
//           </button>
//         ))
//       ) : (
//         <div className="p-8 text-center text-sm text-gray-500">
//           No city found
//         </div>
//       )}
//     </>
//   );

//   const navLinks = [
//     { label: "Services", path: "/navservice" },
//     { label: "Blogs", path: "/blog" },
//     { label: "Contact", path: "/contact" },
//     { label: "About", path: "/about" },
//   ];

//   return (
//     <>
//       <div className="h-[96px] sm:h-[96px] md:h-[64px]" />

//       <nav
//         className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-sm"
//         aria-label="Main Navigation"
//       >
//         {/* ROW 1 */}
//         <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-2">
//           <div className="max-w-[1400px] mx-auto flex items-center gap-1 sm:gap-1.5 lg:gap-2">
//             {/* Logo: Changed to Link for SEO crawling */}
//             <Link
//               to="/"
//               className="flex-shrink-0"
//               aria-label="Local Trade Street Home"
//             >
//               <img
//                 src={logo}
//                 alt="Local Trade Street - Connect with Local Services"
//                 className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto"
//               />
//             </Link>

//             <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

//             {/* DESKTOP: Location Dropdown */}
//             <div
//               className="relative hidden md:block flex-shrink-0"
//               ref={dropdownRef}
//             >
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 aria-expanded={dropdownOpen}
//                 aria-haspopup="listbox"
//                 className="flex items-center gap-1 text-gray-700 font-medium text-xs lg:text-sm border rounded-lg px-2 lg:px-3 py-1.5 hover:bg-gray-50 transition-all whitespace-nowrap"
//               >
//                 <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-orange-500 flex-shrink-0" />
//                 <span className="max-w-[70px] lg:max-w-[110px] xl:max-w-[140px] truncate">
//                   {selectedLocation}
//                 </span>
//                 <ChevronDown
//                   className={`w-3 h-3 flex-shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-64 lg:w-72 overflow-hidden flex flex-col">
//                   <div className="p-3 border-gray-200 border-b bg-white">
//                     <input
//                       type="text"
//                       placeholder="Search from 4000+ cities..."
//                       className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400"
//                       value={citySearch || searchQuery}
//                       onChange={(e) => setCitySearch(e.target.value)}
//                       autoFocus
//                     />
//                   </div>
//                   <div
//                     className="max-h-[300px] overflow-y-auto cursor-pointer"
//                     onScroll={handleScroll}
//                   >
//                     <CityList onSelect={handleCitySelect} />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

//             {/* DESKTOP: Search */}
//             <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 flex-1 min-w-0 p-1">
//               <label htmlFor="desktop-search" className="sr-only">
//                 Search Services
//               </label>
//               <input
//                 id="desktop-search"
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder={`Search in ${selectedLocation}`}
//                 className="flex-1 px-2 lg:px-3 py-1.5 text-xs lg:text-sm outline-none min-w-0"
//               />
//               <button
//                 aria-label="Search Submit"
//                 className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors flex-shrink-0"
//               >
//                 <Search className="w-4 h-4" />
//               </button>
//             </div>

//             {/* MOBILE: Search + City icons */}
//             <div className="flex md:hidden items-center gap-1 ml-auto">
//               <button
//                 onClick={() => setMobileSearchOpen(true)}
//                 className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
//                 aria-label="Open Search"
//               >
//                 <Search className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setMobileCityOpen(true)}
//                 className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 border rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors max-w-[110px]"
//                 aria-label="Select city"
//               >
//                 <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
//                 <span className="truncate">{selectedLocation}</span>
//               </button>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-1 lg:gap-2 ml-2 flex-shrink-0">
//               {/* List Your Business - Kept as button because it's an external window.open action */}
//               <button
//                 onClick={handleListingClick}
//                 className="group relative overflow-hidden hidden cursor-pointer md:inline-flex items-center gap-1.5 lg:gap-2.5 text-[9px] lg:text-[11px] uppercase tracking-wider font-bold text-white rounded-lg px-2 md:px-2.5 lg:px-4 py-2 whitespace-nowrap transition-all duration-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-[1.02] active:scale-95 bg-[linear-gradient(45deg,#f97316,#ea580c,#f97316)] bg-[length:200%_auto]"
//               >
//                 <span className="relative flex h-1.5 w-1.5 lg:h-2 lg:w-2 flex-shrink-0">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 bg-white"></span>
//                 </span>
//                 <span className="relative z-10">Listing Your Business</span>
//               </button>

//               {/* DESKTOP Nav Links - Using NavLink for SEO crawling & Active state */}
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.path}
//                   to={link.path}
//                   className={({ isActive }) =>
//                     `hidden xl:block text-xs lg:text-sm px-1 lg:px-2 py-1 font-medium transition-colors duration-200 rounded-md
//                     ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"}`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}

//               <button
//                 onClick={() => setMenuOpen(true)}
//                 aria-label="Open Menu"
//                 className="p-1.5 lg:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Menu className="w-4 h-4 lg:w-5 lg:h-5" />
//               </button>

//               <button
//                 onClick={() => setProfileOpen(true)}
//                 aria-label="User Profile"
//                 className={`p-1.5 rounded-full border flex-shrink-0 transition-colors hover:bg-gray-50 ${
//                   localStorage.getItem("token")
//                     ? "border-orange-500 bg-orange-50"
//                     : "border-gray-200"
//                 }`}
//               >
//                 <User className="w-4 h-4 lg:w-5 lg:h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ROW 2: Mobile Nav Links */}
//         <div className="md:hidden border-t border-gray-100 bg-white px-3 py-1.5">
//           <div className="flex items-center justify-around">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `text-[11px] font-medium px-2 py-1 rounded-md transition-colors
//                   ${isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-600 hover:text-orange-500"}`
//                 }
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//             <button
//               onClick={handleListingClick}
//               className="text-[11px] font-bold text-orange-500 px-2 py-1 rounded-md border border-orange-400"
//             >
//               List Business
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE Search Overlay - Added labels for SEO and accessibility */}
//       {mobileSearchOpen && (
//         <div className="fixed inset-0 z-[200] bg-white flex flex-col md:hidden">
//           <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-200">
//             <div className="flex items-center border border-orange-400 rounded-lg bg-white flex-1 px-3 py-2 gap-2">
//               <Search className="w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 id="mobile-search-input"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={(e) => {
//                   handleKeyDown(e);
//                   if (e.key === "Enter") setMobileSearchOpen(false);
//                 }}
//                 placeholder={`Search in ${selectedLocation}`}
//                 className="flex-1 text-sm outline-none"
//                 autoFocus
//               />
//             </div>
//             <button
//               onClick={() => setMobileSearchOpen(false)}
//               className="text-sm font-medium text-orange-500"
//             >
//               Cancel
//             </button>
//           </div>
//           {/* ... Popular searches part remains same ... */}
//         </div>
//       )}

//       {/* Other Modals (City Bottom Sheet, Hamburger, Profile) remain same */}
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

//      {vendorFormOpen && (
//   <AddVendorForm
//     onClose={() => setVendorFormOpen(false)}
//     onSuccess={() => {
//       setVendorFormOpen(false);
//       window.location.href = "https://vendor.localtradestreet.com/login";
//     }}
//   />
// )}
//     </>
//   );
// }
