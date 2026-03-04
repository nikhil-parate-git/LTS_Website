import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Phone,
  Eye,
  Send,
  ChevronDown,
  SlidersHorizontal,
  BadgeCheck,
  Star,
  Clock,
  Shield,
  Zap,
  Share2,
  ArrowLeft,
  CheckCircle,
  X,
  Search,
} from "lucide-react";
import Sidebar from "./MainSidebar";

// ─── HELPER ─────────────────────────────────────────────────────
function formatProfileCount(n) {
  if (n >= 1000) {
    const val = n / 1000;
    return (Number.isInteger(val) ? val : val.toFixed(1)) + "k+";
  }
  return String(n);
}

// ─── DATA ────────────────────────────────────────────────────────
const categoryData = {
  "tours-travel": {
    name: "Tours & Travel",
    heroImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
    totalListings: 248,
    businesses: [
      {
        id: 1,
        name: "SS Rana Tours & Travels",
        verified: true,
        sponsored: true,
        rating: 4.4,
        reviews: 312,
        since: 2008,
        address:
          "C-79/144 Arambagh Paharganj, New Delhi 110055- Paharganj, Delhi",
        tags: [
          "Trains & Bus Ticket Agents",
          "Local Travel Agents & Toor Operators",
          "International Travel Agents",
          "SOTC Tour Agents",
          "Domestic Travel Agents",
          "IAIA Approved Travel Agents",
          "Foreign Travel Agents & Toor Operators",
          "24 Hours Travel Agents",
          "Government Approved Travel Agents",
          "MTDC Travel Agents",
          "Travel Complaint Assistance Services",
          "ASTA Approved Travel Agents",
        ],
        speciality: "Goa Tour Packages",
        phone: "+91 98765 43210",
        hours: "10:00 AM-10:00 PM - 24/7",
        profileCount: 49,
        image:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
      },
      {
        id: 2,
        name: "Horizon Travel Agency",
        verified: true,
        sponsored: true,
        rating: 4.7,
        reviews: 198,
        since: 2012,
        address: "Shop 14, Connaught Place, New Delhi 110001",
        tags: [
          "International Tours",
          "Holiday Packages",
          "Visa Assistance",
          "Honeymoon Packages",
          "Group Tours",
          "Budget Travel",
        ],
        speciality: "Europe Tour Packages",
        phone: "+91 99887 66554",
        hours: "9:00 AM - 8:00 PM",
        profileCount: 2100,
        image:
          "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&q=80",
      },
      {
        id: 3,
        name: "SwiftJet Air Ticketing",
        verified: true,
        sponsored: false,
        rating: 4.2,
        reviews: 87,
        since: 2015,
        address: "B-12, Lajpat Nagar II, New Delhi 110024",
        tags: [
          "Air Ticketing",
          "Domestic Flights",
          "Corporate Travel",
          "Airport Transfer",
        ],
        speciality: null,
        phone: "+91 97654 32109",
        hours: "8:00 AM - 11:00 PM",
        profileCount: 980,
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80",
      },
      {
        id: 4,
        name: "Wanderlust Holidays",
        verified: false,
        sponsored: false,
        rating: 3.9,
        reviews: 54,
        since: 2018,
        address: "45, Karol Bagh Market, New Delhi 110005",
        tags: ["Holiday Packages", "Honeymoon Tours", "Budget Travel"],
        speciality: null,
        phone: "+91 96543 21098",
        hours: "10:00 AM - 7:00 PM",
        profileCount: 620,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
      },
      {
        id: 5,
        name: "Royal Cab Services",
        verified: true,
        sponsored: false,
        rating: 4.5,
        reviews: 421,
        since: 2010,
        address: "Near ISBT, Kashmere Gate, Delhi 110006",
        tags: ["Taxi Services", "Airport Transfer", "Outstation Cabs"],
        speciality: null,
        phone: "+91 95432 10987",
        hours: "Open 24 Hours",
        profileCount: 5300,
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&q=80",
      },
    ],
  },
};

const locationOptions = [
  { id: 1, name: "Delhi Race Club, 111003", checked: true },
  { id: 2, name: "Lodhi Colony, 111003", checked: true },
  { id: 3, name: "Lodhi Colony, 111003", checked: false },
  { id: 4, name: "Lodhi Colony, 111003", checked: false },
];

// ─── FILTER OVERLAY ───────────────────────────────────────────────
function FilterOverlay({ open, onClose }) {
  const [rating, setRating] = useState("Customer Ratings");
  const [verified, setVerified] = useState("Verified");
  const [locationSearch, setLocationSearch] = useState("");
  const [locations, setLocations] = useState(locationOptions);

  const toggleLocation = (id) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === id ? { ...loc, checked: !loc.checked } : loc,
      ),
    );
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity touch-none"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto"
          style={{ animation: "popIn 0.2s ease-out" }}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-gray-800">
              Filter Overlay
            </h2>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-5 pb-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Filter By Customer Ratings
              </p>
              <div className="relative">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:border-orange-400 text-gray-600 pr-8"
                >
                  <option>Customer Ratings</option>
                  <option>4★ & above</option>
                  <option>3★ & above</option>
                  <option>2★ & above</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Search Nearby Location
              </p>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 mb-3">
                <Search size={14} className="text-gray-400 shrink-0" />
                <input
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 text-sm focus:outline-none placeholder-gray-400"
                />
              </div>
              <div className="space-y-2.5">
                {filteredLocations.map((loc) => (
                  <label
                    key={loc.id}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      {loc.name}
                    </span>
                    <div
                      onClick={() => toggleLocation(loc.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        loc.checked
                          ? "bg-orange-500 border-orange-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {loc.checked && (
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative">
              <select
                value={verified}
                onChange={(e) => setVerified(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:border-orange-400 text-gray-600 pr-8"
              >
                <option>Verified</option>
                <option>All</option>
                <option>Unverified</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            <button
              onClick={onClose}
              className="w-full bg-orange-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}

// ─── STARS ───────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

// ─── BUSINESS CARD ───────────────────────────────────────────────
function BusinessCard({ biz }) {
  const navigate = useNavigate();
  const [showAllTags, setShowAllTags] = useState(false);

  const VISIBLE = 2;
  const visibleTags = showAllTags ? biz.tags : biz.tags.slice(0, VISIBLE);
  const hiddenTags = showAllTags ? biz.tags.slice(VISIBLE) : [];
  const hasMore = biz.tags.length > VISIBLE;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div
          className="relative w-full sm:w-56 shrink-0 overflow-hidden"
          style={{ minHeight: "180px" }}
        >
          <img
            src={biz.image}
            alt={biz.name}
            className="w-full h-full object-cover"
            style={{ minHeight: "180px" }}
          />
          <div className="absolute top-2.5 right-2.5 bg-white/90 text-gray-700 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Since {biz.since}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={() => navigate(`/business/${biz.id}`)}
                className="text-base font-bold text-blue-700 leading-tight hover:underline cursor-pointer"
              >
                {biz.name}
              </h3>
              {biz.verified && (
                <BadgeCheck size={15} className="text-blue-500 shrink-0" />
              )}
            </div>
            <button className="text-gray-400 hover:text-orange-500 transition-colors shrink-0">
              <Share2 size={14} />
            </button>
          </div>

          <div className="flex items-start gap-1.5 text-gray-500 text-xs">
            <MapPin size={12} className="mt-0.5 text-orange-500 shrink-0" />
            <span>{biz.address}</span>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 items-center">
              {visibleTags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] border border-gray-300 text-gray-700 px-2.5 py-1 rounded-full bg-white font-medium"
                >
                  {tag}
                </span>
              ))}
              {!showAllTags && hasMore && (
                <button
                  onClick={() => setShowAllTags(true)}
                  className="text-[11px] text-blue-600 font-semibold hover:underline ml-1"
                >
                  See More
                </button>
              )}
            </div>
            {showAllTags && hiddenTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center mt-1.5">
                {hiddenTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] border border-gray-300 text-gray-700 px-2.5 py-1 rounded-full bg-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => setShowAllTags(false)}
                  className="text-[11px] text-blue-600 font-semibold hover:underline ml-auto"
                >
                  See Less
                </button>
              </div>
            )}
          </div>

          {biz.speciality && (
            <div className="flex items-center gap-1 text-xs text-orange-500 font-medium">
              <CheckCircle size={12} className="text-orange-400" />
              {biz.speciality}
            </div>
          )}

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={11} className="text-gray-400" />
            <span className="font-medium text-gray-700">Open:</span>
            <span>{biz.hours}</span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-1 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`tel:${biz.phone}`}
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                <Phone size={12} /> Show Number
              </a>
              <button
                onClick={() => navigate(`/business/${biz.id}`)}
                className="flex cursor-pointer items-center gap-1 border border-orange-400 text-orange-500 hover:bg-orange-50 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                <Zap size={11} className="fill-orange-400" /> Sponsored
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye size={12} className="text-orange-400" />
              <span className="font-semibold text-gray-600">
                {formatProfileCount(biz.profileCount)}
              </span>
              <span>Profile Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE SIDEBAR DRAWER ────────────────────────────────────────
function MobileSidebarDrawer({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-gray-50 z-50 overflow-y-auto shadow-2xl"
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
          <span className="font-bold text-gray-800 text-sm">Quick Connect</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-4">
          <Sidebar cityName="Delhi" />
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = categoryData[slug] || categoryData["tours-travel"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Overlay */}
      <FilterOverlay open={filterOpen} onClose={() => setFilterOpen(false)} />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebarDrawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Hero Banner ── */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={data.heroImage}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">
            Category
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-extrabold drop-shadow">
            {data.name}
          </h1>
          <p className="text-white/70 text-sm mt-1">
            {data.totalListings}+ businesses listed
          </p>
        </div>
      </div>

      {/* ── Breadcrumb / Header ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Back + Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-7 h-7 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors shrink-0"
            >
              <ArrowLeft size={19} />
            </button>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <span
              onClick={() => navigate(-1)}
              className="text-gray-400 cursor-pointer text-base truncate"
            >
              Category
            </span>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <span className="bg-emerald-500 text-white text-base px-3 py-1 rounded-lg font-semibold truncate">
              {data.name}
            </span>
          </div>

          {/* Right: Sort + Filter + Connect (mobile) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 pr-7 appearance-none bg-white focus:outline-none focus:border-orange-400 font-medium text-gray-600"
              >
                <option>Relevance</option>
                <option>Rating: High to Low</option>
                <option>Most Reviewed</option>
                <option>Newest First</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:border-orange-400 hover:text-orange-500 transition-colors font-medium"
            >
              <SlidersHorizontal size={12} /> Filters
            </button>
            {/* Mobile: Connect button to open sidebar drawer */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-3 py-1.5 font-bold transition-colors"
            >
              <Send size={12} /> Connect
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* ── Listings ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-bold text-gray-800">
                  {data.businesses.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-orange-500">
                  {data.totalListings}+
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Shield size={11} className="text-green-500" />
                <span>Verified listings only</span>
              </div>
            </div>

            <div className="space-y-4">
              {data.businesses.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-2xl transition-all duration-300 text-sm hover:shadow-lg hover:shadow-orange-200">
                Load More Businesses
              </button>
            </div>
          </div>

          {/* ── Desktop Sidebar ── */}
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar cityName="Delhi" />
          </div>
        </div>
      </div>
    </div>
  );
}
