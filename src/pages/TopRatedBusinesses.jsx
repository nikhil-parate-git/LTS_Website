import { useState } from "react";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const businesses = [
  {
    id: 1,
    name: "ApplyToLoans Consultancy Services",
    category: "Banks Loans & Currency Exchange",
    location: "Uttam Nagar, Delhi",
    rating: 5.0,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80",
    verified: true,
    badge: "Top Rated",
  },
  {
    id: 2,
    name: "Fire Engineering Technology",
    category: "Fire Fighting Solution Providers",
    location: "Uttam Nagar, Delhi",
    rating: 5.0,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    verified: true,
    badge: "Top Rated",
  },
  {
    id: 3,
    name: "Full Body Massage In Delhi",
    category: "Massage & Spa Parlours",
    location: "Paharganj, Delhi",
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
    verified: true,
    badge: "Popular",
  },
  {
    id: 4,
    name: "Om Sai Safeguard Services Pvt. Ltd.",
    category: "Security Guards & Security Agencies",
    location: "Raj Nagar - II, Delhi",
    rating: 5.0,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400&q=80",
    verified: true,
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Detective Guru",
    category: "Marriage Bureau & Matrimony Services",
    location: "Moti Bagh, Delhi",
    rating: 4.8,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    verified: false,
    badge: null,
  },
  {
    id: 6,
    name: "Russian Spa Mahipalpur",
    category: "Massage & Spa Parlours",
    location: "Mahipalpur, Delhi",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
    verified: true,
    badge: "Popular",
  },
  {
    id: 7,
    name: "Birth Certificate Agents Passport Agent",
    category: "Legal Documents & License Agents",
    location: "Shahdara, Delhi",
    rating: 5.0,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    verified: true,
    badge: "Top Rated",
  },
  {
    id: 8,
    name: "DCC Animal Hospital",
    category: "Veterinary Clinics & Pet Doctors",
    location: "Masjid Moth Extn, Delhi",
    rating: 4.7,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    verified: true,
    badge: null,
  },
];

const badgeColors = {
  "Top Rated": "bg-orange-500",
  "Popular": "bg-emerald-500",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          fill={star <= Math.round(rating) ? "#f97316" : "#e5e7eb"}
          stroke="none"
        />
      ))}
    </div>
  );
}

function BusinessCard({ business }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/business/${business.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(249, 115, 22, 0.12), 0 8px 16px rgba(0,0,0,0.08)"
          : "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[190px]">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Category badge top-left */}
        <div className="absolute top-0 left-0 right-0">
          <div className="bg-orange-500 text-white text-[11px] font-semibold px-3 py-1.5 inline-block max-w-[85%] truncate rounded-br-xl">
            {business.category}
          </div>
        </div>

        {/* Top Rated / Popular badge top-right */}
        {business.badge && (
          <div className={`absolute top-2 right-2 ${badgeColors[business.badge]} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow`}>
            {business.badge}
          </div>
        )}

        {/* Verified tick */}
        {business.verified && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <span>✓</span> Verified
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3
          className="font-bold text-gray-900 text-sm leading-snug mb-1.5 truncate transition-colors duration-200"
          style={{ color: hovered ? "#f97316" : "#111827" }}
        >
          {business.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2.5">
          <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
          <span className="truncate">{business.location}</span>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
            {business.rating.toFixed(1)}
          </span>
          <StarRating rating={business.rating} />
          <span className="text-gray-400 text-xs">({business.reviews})</span>
        </div>
      </div>
    </div>
  );
}

export default function TopRatedBusinesses() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(businesses.length / itemsPerPage);
  const visible = businesses.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section className="py-14 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Rated Businesses{" "}
              <span className="text-orange-500">in Delhi</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Trusted by thousands of local customers</p>
          </div>

          {/* <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="ml-2 text-orange-500 font-semibold text-sm hover:underline underline-offset-4">
              View All →
            </button>
          </div> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {visible.map((biz, i) => (
            <div
              key={biz.id}
              style={{
                animation: `fadeSlideUp 0.4s ease both`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <BusinessCard business={biz} />
            </div>
          ))}
        </div>

        {/* Load More */}
        {/* <div className="flex justify-center mt-10">
          <button className="group relative bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition-all duration-300 overflow-hidden">
            <span className="relative z-10">Load More Businesses</span>
          </button>
        </div> */}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}