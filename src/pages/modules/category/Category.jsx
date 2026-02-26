import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home, ChevronRight, MapPin, Phone, Star, Clock, Shield,
  BadgeCheck, Eye, Send, ChevronDown, SlidersHorizontal,
  Bookmark, Share2, Zap, TrendingUp, Users, Filter, X
} from "lucide-react";
// navbar is now provided by MainLayout
// import Navbar from "../components/Layouts/navbar";

// ─── MOCK BUSINESS DATA ─────────────────────────────────────────
const categoryData = {
  "tours-travel": {
    name: "Tours & Travel",
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
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
        address: "C-79/364 Azamibagh Paharganj, New Delhi 110058",
        area: "Paharganj, Delhi",
        tags: ["Trains & Bus Tickets", "Local Travel Agents & Tour Operators"],
        phone: "+91 98765 43210",
        hours: "10:00 AM - 10:00 PM · 24/7",
        views: "4k+ Profile Views",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80",
        badge: "Top Rated",
      },
      {
        id: 2,
        name: "Horizon Travel Agency",
        verified: true,
        sponsored: false,
        rating: 4.7,
        reviews: 198,
        since: 2012,
        address: "Shop 14, Connaught Place, New Delhi 110001",
        area: "Connaught Place, Delhi",
        tags: ["International Tours", "Holiday Packages", "Visa Assistance"],
        phone: "+91 99887 66554",
        hours: "9:00 AM - 8:00 PM",
        views: "2.1k+ Profile Views",
        image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=500&q=80",
        badge: "Premium",
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
        area: "Lajpat Nagar, Delhi",
        tags: ["Air Ticketing", "Domestic Flights", "Corporate Travel"],
        phone: "+91 97654 32109",
        hours: "8:00 AM - 11:00 PM",
        views: "980+ Profile Views",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80",
        badge: null,
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
        area: "Karol Bagh, Delhi",
        tags: ["Holiday Packages", "Honeymoon Tours", "Budget Travel"],
        phone: "+91 96543 21098",
        hours: "10:00 AM - 7:00 PM",
        views: "620+ Profile Views",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
        badge: null,
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
        area: "Kashmere Gate, Delhi",
        tags: ["Taxi Services", "Airport Transfer", "Outstation Cabs"],
        phone: "+91 95432 10987",
        hours: "Open 24 Hours",
        views: "5.3k+ Profile Views",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&q=80",
        badge: "Most Popular",
      },
    ],
  },
};

// ─── SIDEBAR DATA ───────────────────────────────────────────────
const popularCategories = [
  "Air & Bus Ticket Agents",
  "Local Travel Agents & Tour Operators",
  "Domestic Travel Agents",
  "International Travel Agents",
  "Air & Bus Ticket Agents",
];

const nearbyAreas = [
  { name: "All of CA", count: 14122 },
  { name: "Delhi NCR", count: 73200 },
  { name: "Mumbai", count: 41600 },
  { name: "Ajmer Gate", count: 11000 },
];

const relatedKeywords = [
  "Tour & Travel Agents in Delhi",
  "Travel Agents near Me",
  "Cheap Flight Ticket Booking",
  "Bus Ticket Booking Delhi",
  "Honeymoon Package Deals",
  "International Tour Packages",
];

// ─── STAR RATING ────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 fill-gray-200"}
        />
      ))}
    </div>
  );
}

// ─── BUSINESS CARD ──────────────────────────────────────────────
function BusinessCard({ biz }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Sponsored Badge */}
      {biz.sponsored && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
          <Zap size={9} /> Sponsored
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={() => setSaved(!saved)}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow hover:scale-110 transition-transform"
      >
        <Bookmark size={14} className={saved ? "fill-orange-500 text-orange-500" : "text-gray-400"} />
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-52 h-44 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={biz.image}
            alt={biz.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Since badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Since {biz.since}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Name + Badge */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
                  {biz.name}
                </h3>
                {biz.verified && (
                  <BadgeCheck size={16} className="text-blue-500 shrink-0" />
                )}
                {biz.badge && (
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {biz.badge}
                  </span>
                )}
              </div>
              <button className="text-gray-400 hover:text-orange-500 transition-colors">
                <Share2 size={14} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <Stars rating={biz.rating} />
              <span className="text-xs font-bold text-amber-500">{biz.rating}</span>
              <span className="text-xs text-gray-400">({biz.reviews} reviews)</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-1.5 text-gray-500 text-xs mb-2">
              <MapPin size={12} className="mt-0.5 text-orange-400 shrink-0" />
              <span>{biz.address}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {biz.tags.map((tag, i) => (
                <span key={i} className="text-[11px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Hours + Views */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-green-500" />
                <span className="text-green-600 font-semibold">Open</span> · {biz.hours}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {biz.views}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
            <a
              href={`tel:${biz.phone}`}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-orange-200"
            >
              <Phone size={12} /> Show Number
            </a>
            <button className="flex items-center gap-1.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
              <Send size={12} /> Send Enquiry
            </button>
            <button className="ml-auto text-xs text-blue-500 hover:underline font-medium">
              View Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ────────────────────────────────────────────────────
function Sidebar({ cityName }) {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [req, setReq] = useState("");

  return (
    <div className="space-y-5">

      {/* Enquiry Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-3">
          <p className="text-white font-bold text-sm">Connect with Top Agents</p>
          <p className="text-orange-100 text-xs mt-0.5">& Tour Operators in <span className="font-bold">{cityName}</span></p>
        </div>
        <div className="p-4 space-y-2.5">
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your Mobile No."
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
          />
          <textarea
            value={req}
            onChange={(e) => setReq(e.target.value)}
            placeholder="What is your Requirements"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none"
          />
          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-200 hover:scale-[1.02]">
            Send Enquiry
          </button>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-orange-500" /> Popular Category
        </h3>
        <div className="space-y-1.5">
          {popularCategories.map((cat, i) => (
            <button key={i} className="w-full text-left text-xs text-blue-600 hover:text-orange-500 hover:bg-orange-50 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2">
              <ChevronRight size={11} className="text-orange-400" /> {cat}
            </button>
          ))}
        </div>
        <button className="mt-2 text-xs font-bold text-orange-500 hover:underline">Show More →</button>
      </div>

      {/* Are You a Travel Agent */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4">
        <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
          <Users size={13} className="text-blue-500" />
          Are you a Travel Agent in your Operational City?
        </p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
          Add your Business Listings
        </button>
      </div>

      {/* Nearby Areas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-orange-500" /> Nearby Areas
        </h3>
        <div className="space-y-1.5">
          {nearbyAreas.map((area, i) => (
            <div key={i} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors">
              <span className="text-blue-600 group-hover:text-orange-500 font-medium">{area.name}</span>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{area.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <button className="mt-2 text-xs font-bold text-orange-500 hover:underline">Show More →</button>
      </div>

      {/* Related Keywords */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Most Searched Related Keywords</h3>
        <div className="flex flex-wrap gap-1.5">
          {relatedKeywords.map((kw, i) => (
            <button key={i} className="text-[11px] text-blue-600 hover:text-white hover:bg-orange-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full transition-all font-medium">
              {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CATEGORY PAGE ─────────────────────────────────────────
export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const data = categoryData[slug] || categoryData["tours-travel"];
  const filters = ["All", "Verified", "Sponsored", "Top Rated", "Open Now"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* navbar rendered by MainLayout */}

      {/* ── Hero Banner ── */}
      <div className="relative h-44 overflow-hidden">
        <img src={data.heroImage} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-1">Category</p>
          <h1 className="text-white text-2xl md:text-3xl font-extrabold drop-shadow">{data.name}</h1>
          <p className="text-white/70 text-sm mt-1">{data.totalListings}+ businesses listed</p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center w-7 h-7 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Home size={13} />
            </button>
            <ChevronRight size={13} className="text-gray-400" />
            <span className="text-gray-400">Category</span>
            <ChevronRight size={13} className="text-gray-400" />
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg font-semibold">{data.name}</span>
          </div>

          {/* Sort + Filter */}
          <div className="flex items-center gap-2">
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
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:border-orange-400 hover:text-orange-500 transition-colors font-medium"
            >
              <SlidersHorizontal size={12} /> Filters
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="max-w-screen-xl mx-auto px-4 pb-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                activeFilter === f
                  ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6">

          {/* Left: Business Listings */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-gray-800">{data.businesses.length}</span> of{" "}
                <span className="font-bold text-orange-500">{data.totalListings}+</span> results
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Shield size={11} className="text-green-500" />
                <span>Verified listings only</span>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-4">
              {data.businesses.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="bg-white border-2 border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-2xl transition-all duration-300 text-sm hover:shadow-lg hover:shadow-orange-200">
                Load More Businesses
              </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar cityName="Delhi" />
          </div>
        </div>
      </div>
    </div>
  );
}