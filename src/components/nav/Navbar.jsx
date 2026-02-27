import { useState, useRef, useEffect } from "react";
import { Mic, Search, Menu, User, MapPin, ChevronDown } from "lucide-react";
import logo from "../../../src/assets/logo.png";

const locations = [
  "Nagpur (Nagpur NCR)", "Mumbai", "Bangalore", "Chennai",
  "Hyderabad", "Pune", "Kolkata", "Nagpur", "Ahmedabad", "Jaipur",
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMic = () => setIsListening((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 px-4 py-2  top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center gap-3">

        {/* Logo */}
        <div className="flex items-center shrink-0 select-none ">
          <img
            src={logo}
            alt="Local Trade Street Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-300 mx-1" />

        {/* Location Dropdown */}
        <div className="relative hidden md:block shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-gray-700 font-medium text-sm whitespace-nowrap hover:text-orange-500 transition-colors border border-gray-200 rounded-lg px-3 py-1.5"
          >
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="max-w-[130px] truncate">{selectedLocation}</span>
            <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown List */}
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-52 max-h-64 overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setSelectedLocation(loc); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                    ${selectedLocation === loc
                      ? "text-orange-500 font-semibold bg-orange-50"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block h-8 w-px bg-gray-300 mx-1" />

        {/* Search Bar */}
        <div className="flex flex-1 items-center border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300 transition-all">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${selectedLocation}`}
            className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={handleMic}
            className={`p-2 transition-colors ${isListening ? "text-red-500" : "text-pink-500 hover:text-pink-600"}`}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0 ml-2">
          <button className="hidden lg:flex items-center gap-1 border border-gray-800 text-gray-800 font-semibold text-sm px-3 py-1.5 rounded hover:bg-gray-100 transition-colors whitespace-nowrap">
            List Your Business
            <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">Free</span>
          </button>
          <button className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <button className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700">
            <User className="w-5 h-5" />
          </button>
        </div>

      </div>
    </nav>
  );
}