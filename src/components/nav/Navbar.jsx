
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
import { useNavigate, Link, NavLink } from "react-router-dom";
import ProfileLogin from "../../pages/modules/profilelogin/ProfileLogin";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../redux/slice/citydropdown/getCityDropdownSlice";
import { setCity } from "../../redux/slice/locationSlice";
import AddVendorForm from "../../components/nav/AddVendorForm";
import {
  setSearchQuery,
  clearSearchResults,
  fetchCategoryResults,
  fetchSubcategoryResults,
} from "../../redux/slice/searching/getSearchSlice";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (value.trim().length < 2) {
      setIsPending(false);
      setDebounced(value);
      return;
    }
    setIsPending(true);
    const t = setTimeout(() => {
      setDebounced(value);
      setIsPending(false);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return { debounced, isPending };
}

const SkeletonRow = () => (
  <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
    <div className="w-6 h-6 rounded bg-gray-200 flex-shrink-0" />
    <div className="flex-1 space-y-1.5">
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-2 bg-gray-100 rounded w-1/4" />
    </div>
  </div>
);

const SearchSkeleton = () => (
  <>
    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
      Categories
    </div>
    <SkeletonRow />
    <SkeletonRow />
    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 mt-1">
      Services
    </div>
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </>
);

const SearchDropdownContent = ({
  isLoading,
  hasResults,
  searchInput,
  categories = [],
  subcategories = [],
  onResultClick,
  mobile = false,
}) => {
  const imgSize = mobile ? "w-8 h-8" : "w-6 h-6";
  if (isLoading) return <SearchSkeleton />;
  if (!hasResults)
    return (
      <div className={`${mobile ? "p-8" : "p-6"} text-center text-sm text-gray-500`}>
        No results found for &quot;{searchInput}&quot;
      </div>
    );
  return (
    <>
      {categories.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
            Categories
          </div>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onResultClick(cat, "category", mobile)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left border-b border-gray-50"
            >
              {cat.icon ? (
                <img src={cat.icon} alt={cat.name} className={`${imgSize} rounded object-cover flex-shrink-0`} />
              ) : (
                <div className={`${imgSize} rounded bg-orange-100 flex-shrink-0`} />
              )}
              <p className="text-sm font-medium text-gray-800">{cat.name}</p>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default function Navbar() {
  const [selectedLocation, setSelectedLocation] = useState("Select City");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileCityOpen, setMobileCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [vendorFormOpen, setVendorFormOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cities, loading: citiesLoading } = useSelector((s) => s.cityDropdown);
  const selectedCityFromRedux = useSelector((s) => s.location.selectedCity);
  const {
    categories = [],
    subcategories = [],
    categoryLoading,
    subcategoryLoading,
  } = useSelector((s) => s.search);

  const { debounced: debouncedSearch, isPending } = useDebounce(searchInput, 500);
  const isLoading = isPending || categoryLoading || subcategoryLoading;
  const hasResults = categories.length > 0 || subcategories.length > 0;

  useEffect(() => {
    if (selectedCityFromRedux) setSelectedLocation(selectedCityFromRedux);
  }, [selectedCityFromRedux]);

  useEffect(() => { dispatch(fetchCities()); }, [dispatch]);

  useEffect(() => {
    if (debouncedSearch.trim().length < 2) {
      dispatch(clearSearchResults());
      setShowSearchResults(false);
      return;
    }
    dispatch(setSearchQuery(debouncedSearch));
    dispatch(fetchCategoryResults(debouncedSearch));
    dispatch(fetchSubcategoryResults(debouncedSearch));
    setShowSearchResults(true);
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (searchInput.trim().length >= 2) setShowSearchResults(true);
    else setShowSearchResults(false);
  }, [searchInput]);

  const toSlug = (name = "") =>
    name.trim().toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleCitySelect = (cityName) => {
    if (!cityName) return;
    setSelectedLocation(cityName);
    dispatch(setCity(cityName));
    setDropdownOpen(false);
    setMobileCityOpen(false);
    setCitySearch("");
  };

  const filteredCities = useMemo(() => {
    const list = Array.isArray(cities) ? cities : [];
    if (!citySearch) return list;
    return list.filter((c) => c?.name?.toLowerCase().includes(citySearch.toLowerCase()));
  }, [cities, citySearch]);

  const displayCities = filteredCities.slice(0, visibleCount);

  const handleCityKeyDown = (e) => {
    if (e.key === "Enter" && citySearch.trim()) {
      const exact = cities.find((c) => c.name.toLowerCase() === citySearch.toLowerCase());
      handleCitySelect(exact ? exact.name : citySearch);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 20 && visibleCount < filteredCities.length)
      setVisibleCount((p) => p + 50);
  };

  useEffect(() => { setVisibleCount(50); }, [citySearch, dropdownOpen, mobileCityOpen]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setShowSearchResults(false);
    }
    if (e.key === "Escape") setShowSearchResults(false);
  };

  const handleSearchResultClick = (item, type, mobile = false) => {
    setShowSearchResults(false);
    if (mobile) setMobileSearchOpen(false);
    setSearchInput("");
    dispatch(clearSearchResults());
    const slug = toSlug(item.name);
    const citySlug = toSlug(
      selectedLocation && selectedLocation !== "Select City" ? selectedLocation : "india"
    );
    if (type === "category") {
      navigate(`/subcategory/${item.cateId || item._id || item.id}/${slug}`);
    } else {
      navigate(`/service/${item.catId || item.cateId || item._id}/${item.subCateId || item.subCategoryId || item._id}/${citySlug}/${slug}`);
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    dispatch(clearSearchResults());
    setShowSearchResults(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) setMobileCityOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSearchOpen || mobileCityOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileSearchOpen, mobileCityOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const isLoggedIn = !!localStorage.getItem("token");

  const CityList = ({ onSelect }) => (
    <>
      {citiesLoading ? (
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
        <div className="p-8 text-center text-sm text-gray-500">No city found</div>
      )}
    </>
  );

  const navLinks = [{ label: "Services", path: "/navservice" }];

  /* ─────────────────────────────────────────────
     MOBILE LAYOUT (< md):
       Row 1 →  Logo | Search bar (full width) | Profile | Menu
       Row 2 →  📍 City pill (full width tap) | Services | List Business
     DESKTOP LAYOUT (≥ md):
       Single row → Logo | City ▼ | Search bar | [CTA] [Links] [Menu] [Profile]
  ───────────────────────────────────────────── */

  return (
    <>
      {/* Spacer: mobile 2 rows ~100px, desktop 1 row ~64px */}
      <div className="h-[100px] md:h-[64px]" />

      <nav
        className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-sm"
        aria-label="Main Navigation"
      >

        {/* ══════════ ROW 1 ══════════ */}
        <div className="px-3 sm:px-4 md:px-5 lg:px-6 py-2 border-b border-gray-100 md:border-none">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0" aria-label="Home">
              <img
                src={logo}
                alt="Local Trade Street"
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
            </Link>

            {/* ── DESKTOP: divider + City ── */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <div className="h-7 w-px bg-gray-200" />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1.5 text-gray-700 font-medium text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-all whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span className="max-w-[120px] xl:max-w-[160px] truncate">{selectedLocation}</span>
                  <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] w-72 overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search from 4000+ cities..."
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        onKeyDown={handleCityKeyDown}
                        autoFocus
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto" onScroll={handleScroll}>
                      <CityList onSelect={handleCitySelect} />
                    </div>
                  </div>
                )}
              </div>
              <div className="h-7 w-px bg-gray-200" />
            </div>

            {/* ── MOBILE: Search bar (flex-1, full) ── */}
            <div className="flex md:hidden flex-1 min-w-0">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="w-full flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-50 text-gray-400 text-sm hover:border-orange-400 transition-colors"
                aria-label="Search services"
              >
                <Search className="w-4 h-4 flex-shrink-0 text-orange-500" />
                <span className="truncate text-gray-400 text-xs">
                  Search in {selectedLocation}…
                </span>
              </button>
            </div>

            {/* ── DESKTOP: Search bar ── */}
            <div className="relative hidden md:flex flex-1 min-w-0" ref={searchRef}>
              <div className="w-full flex items-center border border-gray-300 rounded-lg bg-white focus-within:border-orange-400 transition-colors px-1 py-1">
                <label htmlFor="desktop-search" className="sr-only">Search Services</label>
                <input
                  id="desktop-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => { if (searchInput.trim().length >= 2) setShowSearchResults(true); }}
                  placeholder={`Search services in ${selectedLocation}`}
                  className="flex-1 px-3 py-1.5 text-sm outline-none min-w-0 bg-transparent"
                />
                {searchInput && (
                  <button onClick={clearSearch} className="p-1 text-gray-400 hover:text-gray-600" aria-label="Clear">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  aria-label="Search"
                  onClick={() => {
                    if (searchInput.trim()) {
                      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
                      setShowSearchResults(false);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {isLoading
                    ? <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    : <Search className="w-4 h-4" />}
                </button>
              </div>
              {showSearchResults && searchInput.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] max-h-[400px] overflow-y-auto">
                  <SearchDropdownContent
                    isLoading={isLoading} hasResults={hasResults}
                    searchInput={searchInput} categories={categories}
                    subcategories={subcategories} onResultClick={handleSearchResultClick}
                  />
                </div>
              )}
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1.5 flex-shrink-0">

              {/* MOBILE: Profile button — always visible */}
              <button
                onClick={() => setProfileOpen(true)}
                aria-label="Profile"
                className={`flex md:hidden items-center justify-center w-9 h-9 rounded-full border-2 transition-colors flex-shrink-0 ${
                  isLoggedIn
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-300 bg-white text-gray-600"
                }`}
              >
                <User className="w-4 h-4" />
              </button>

              {/* MOBILE: Menu button */}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Menu"
                className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* DESKTOP: List Business CTA */}
              <button
                onClick={() => setVendorFormOpen(true)}
                className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-white rounded-lg px-4 py-2 whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-orange-500 to-orange-600"
              >
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                Listing Your Business
              </button>

              {/* DESKTOP: Nav links (xl+) */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `hidden xl:block text-sm px-2 py-1 font-medium transition-colors rounded-md whitespace-nowrap ${
                      isActive ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* DESKTOP: Menu */}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open Menu"
                className="hidden md:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* DESKTOP: Profile */}
              <button
                onClick={() => setProfileOpen(true)}
                aria-label="Profile"
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full border-2 transition-colors ${
                  isLoggedIn
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ══════════ ROW 2 — Mobile only ══════════ */}
        <div className="md:hidden bg-white px-3 py-2">
          <div className="flex items-center gap-2">

            {/* City selector — left side, looks like a pill */}
            <button
              onClick={() => setMobileCityOpen(true)}
              className="flex items-center gap-1.5 border border-orange-300 bg-orange-50 rounded-lg px-3 py-1.5 text-xs font-semibold text-orange-700 whitespace-nowrap flex-shrink-0 hover:bg-orange-100 transition-colors"
              aria-label="Select city"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span className="max-w-[80px] truncate">{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-orange-400" />
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

            {/* Nav links */}
            <div className="flex items-center gap-1 flex-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-medium px-2 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                      isActive ? "text-orange-500 bg-orange-50" : "text-gray-600 hover:text-orange-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* List Business — mobile */}
            <button
              onClick={() => setVendorFormOpen(true)}
              className="flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 px-2.5 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              List Business
            </button>
          </div>
        </div>

      </nav>

      {/* ══════════ MOBILE: Search Full-Screen Overlay ══════════ */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col md:hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex-1 flex items-center gap-2 border-2 border-orange-400 rounded-xl px-3 py-2.5 bg-white">
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin text-orange-400 flex-shrink-0" />
                : <Search className="w-4 h-4 text-orange-500 flex-shrink-0" />
              }
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  handleSearchKeyDown(e);
                  if (e.key === "Enter") setMobileSearchOpen(false);
                }}
                placeholder={`Search services in ${selectedLocation}`}
                className="flex-1 text-sm outline-none bg-transparent min-w-0"
                autoFocus
              />
              {searchInput && (
                <button onClick={clearSearch} aria-label="Clear">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-sm font-semibold text-orange-500 whitespace-nowrap px-1"
            >
              Cancel
            </button>
          </div>

          {/* Results or empty state */}
          {searchInput.trim().length >= 2 ? (
            <div className="flex-1 overflow-y-auto">
              <SearchDropdownContent
                isLoading={isLoading} hasResults={hasResults}
                searchInput={searchInput} categories={categories}
                subcategories={subcategories} onResultClick={handleSearchResultClick} mobile
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                <Search className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Find services near you</p>
                <p className="text-xs text-gray-400">Type at least 2 characters to start searching</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════ MOBILE: City Full-Screen Overlay ══════════ */}
      {mobileCityOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col md:hidden" ref={mobileDropdownRef}>
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <h3 className="text-base font-semibold text-gray-800">Select City</h3>
            </div>
            <button
              onClick={() => setMobileCityOpen(false)}
              className="text-sm font-semibold text-orange-500 px-2 py-1"
            >
              Close
            </button>
          </div>
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <input
              type="text"
              placeholder="Search from 4000+ cities..."
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-orange-400 bg-white"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              onKeyDown={handleCityKeyDown}
              autoFocus
            />
          </div>
          <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
            <CityList onSelect={handleCitySelect} />
          </div>
        </div>
      )}

      <HamburgerDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {profileOpen &&
        (isLoggedIn ? (
          <ProfileDropdown onClose={() => setProfileOpen(false)} onLogout={handleLogout} />
        ) : (
          <ProfileLogin onClose={() => setProfileOpen(false)} />
        ))}

      {vendorFormOpen && (
        <AddVendorForm
          onClose={() => setVendorFormOpen(false)}
          onSuccess={() => {
            setVendorFormOpen(false);
            window.location.href = "https://lts-vendor-panel.vercel.app/";
          }}
        />
      )}
    </>
  );
}