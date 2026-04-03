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
        <div className="max-w-[1400px] mx-auto flex items-center gap-1 lg:gap-2">
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-8 md:h-9 lg:h-10 w-auto" />
          </div>

          <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

          {/* Location Dropdown */}
          <div
            className="relative hidden md:block flex-shrink-0"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-700 font-medium text-xs lg:text-sm border rounded-lg px-2 lg:px-3 py-1.5 hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-orange-500 flex-shrink-0" />
              <span className="max-w-[70px] lg:max-w-[100px] truncate">
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
                        <MapPin className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
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

          <div className="hidden md:block h-7 w-px bg-gray-200 mx-1 flex-shrink-0" />

          {/* Search Box */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 flex-1 min-w-0 p-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Search in ${selectedLocation}`}
              className="flex-1 px-2 lg:px-3 py-1.5 text-xs lg:text-sm outline-none min-w-0"
            />
          </div>

          {/* Right Side Nav Items */}
          <div className="flex items-center gap-1 lg:gap-2 ml-2 flex-shrink-0">
            {/* List Your Business Button */}
            <button
              onClick={() =>
                window.open(
                  "https://vendor.localtradestreet.com/signin",
                  "_blank",
                )
              }
              className="
                group relative overflow-hidden
                hidden cursor-pointer md:inline-flex items-center gap-1.5 lg:gap-2.5
                text-[9px] lg:text-[11px] uppercase tracking-wider font-bold text-white
                rounded-lg px-2.5 lg:px-4 py-2 whitespace-nowrap flex-shrink-0
                transition-all duration-500
                hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]
                hover:scale-[1.02] active:scale-95
                bg-[linear-gradient(45deg,#f97316,#ea580c,#f97316)]
                bg-[length:200%_auto]
              "
              style={{ animation: "gradientMove 3s ease infinite" }}
            >
              <style>{`
                @keyframes gradientMove {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                @keyframes shimmerSweep {
                  0% { left: -100%; }
                  100% { left: 200%; }
                }
              `}</style>

              <span className="relative flex h-1.5 w-1.5 lg:h-2 lg:w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 bg-white shadow-[0_0_10px_#fff]"></span>
              </span>

              <span className="relative z-10 hidden lg:inline">
                Listing Your Business
              </span>
              <span className="relative z-10 lg:hidden">List Business</span>

              <div
                className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
                style={{ animation: "shimmerSweep 2.5s infinite ease-in-out" }}
              />
            </button>

            {/* Services Button */}
            <button
              onClick={() => navigate("/navservice")}
              className="hidden cursor-pointer xl:block text-xs lg:text-sm hover:text-orange-500 px-1 lg:px-2 whitespace-nowrap font-medium text-gray-700 transition-colors duration-200"
            >
              Services
            </button>

            {/* Blog Button */}
            <button
              onClick={() => navigate("/blog")}
              className="hidden cursor-pointer xl:block text-xs lg:text-sm hover:text-orange-500 px-1 lg:px-2 whitespace-nowrap font-medium text-gray-700 transition-colors duration-200"
            >
              Blogs
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="hidden cursor-pointer xl:block text-xs lg:text-sm hover:text-orange-500 px-1 lg:px-2 whitespace-nowrap"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hidden cursor-pointer xl:block text-xs lg:text-sm hover:text-orange-500 px-1 lg:px-2 whitespace-nowrap"
            >
              About
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-1.5 lg:p-2 text-gray-600 flex-shrink-0"
            >
              <Menu className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className={`p-1.5 rounded-full border flex-shrink-0 ${
                localStorage.getItem("token")
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200"
              }`}
            >
              <User className="w-4 h-4 lg:w-5 lg:h-5" />
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
