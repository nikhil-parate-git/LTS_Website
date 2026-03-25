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
  const [isListening, setIsListening] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);

  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null); 

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
                        <button
                          key={`${city.name}-${index}`}
                          onClick={() => handleCitySelect(city?.name)}
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
