import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Star, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchTopRatedVendors } from "../../../redux/slice/topRatedVendor/getAllTopRatedVendorSlice";
// import {setCity} from "../../../redux/slice/locationSlice"
const badgeColors = {
  "Top Rated": "bg-orange-500",
  "Popular": "bg-emerald-500",
};

function StarRating({ rating = 5 }) {
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

  // API mapping to UI fields
  const cardData = {
    id: business._id,
    name: business.companyName || business.name,
    category: "Service Provider", // Aap category name API se bhi fetch kar sakte hain
    location: `${business.addressInfo?.officeAddress}, ${business.addressInfo?.city}`,
    rating: 5.0, // Filhal static kyunki API mein rating field nahi dikh rahi
    reviews: 0,
    image: business.companyImage || "https://via.placeholder.com/400",
    verified: business.isAccountVerified,
    badge: business.topRated ? "Top Rated" : null,
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // for go to vendor id page
      // onClick={() => navigate(`/business/${cardData.id}`)}

      // for go to no vendor found page
      onClick={() => navigate(`/business/${business.id}`)}

      
      className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(249, 105, 22, 0.12), 0 8px 16px rgba(0,0,0,0.08)"
          : "0 2px 12px rgba(0,0,0,0.07)",
      }}
    >
      <div className="relative overflow-hidden h-[190px]">
        <img
          src={cardData.image}
          alt={cardData.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1)" : "scale(1)" }}
        />
        <div className="absolute top-0 left-0 right-0">
          <div className="bg-orange-500 text-white text-[11px] font-semibold px-3 py-1.5 inline-block max-w-[85%] truncate rounded-br-xl">
            {cardData.category}
          </div>
        </div>
        {cardData.badge && (
          <div className={`absolute top-2 right-2 ${badgeColors["Top Rated"]} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow`}>
            {cardData.badge}
          </div>
        )}
        {cardData.verified && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <span>✓</span> Verified
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1.5 truncate transition-colors duration-200"
            style={{ color: hovered ? "#f97316" : "#111827" }}>
          {cardData.name}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2.5">
          <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
          <span className="truncate">{cardData.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
            {cardData.rating.toFixed(1)}
          </span>
          <StarRating rating={cardData.rating} />
        </div>
      </div>
    </div>
  );
}

export default function TopRatedBusinesses() {
  const dispatch = useDispatch();
  const { selectedCity } = useSelector((state) => state.location);
  const { vendors, loading, error } = useSelector((state) => state.topRatedVendors);

  useEffect(() => {
    dispatch(fetchTopRatedVendors());
  }, [dispatch]);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
    </div>
  );

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="py-14 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-8 text-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Rated Businesses in <span className="text-orange-500">{selectedCity}</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Trusted by thousands of local customers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {vendors.map((vendor, i) => (
            <div key={vendor._id} style={{ animation: `fadeSlideUp 0.4s ease both`, animationDelay: `${i * 0.06}s` }}>
              <BusinessCard business={vendor} />
            </div>
          ))}
        </div>
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