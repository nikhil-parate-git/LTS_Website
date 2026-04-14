// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MapPin, Star, Loader2, BadgeCheck, TrendingUp } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { fetchTopRatedVendors } from "../../../redux/slice/topRatedVendor/getAllTopRatedVendorSlice";

// function StarRating({ rating = 5 }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           className="w-3.5 h-3.5"
//           fill={star <= Math.round(rating) ? "#f97316" : "#d1d5db"}
//           stroke="none"
//         />
//       ))}
//     </div>
//   );
// }

// function BusinessCard({ business, index }) {
//   const navigate = useNavigate();
//   const [hovered, setHovered] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   const cardData = {
//     id: business._id,
//     name: business.companyName || business.name || "Unknown Business",
//     category: business.category || "Service Provider",
//     location:
//       [business.addressInfo?.officeAddress, business.addressInfo?.city]
//         .filter(Boolean)
//         .join(", ") || "Nagpur",
//     rating: business.rating || 5.0,
//     reviews: business.reviewCount || 0,
//     image: imgError
//       ? `https://ui-avatars.com/api/?name=${encodeURIComponent(business.companyName || "B")}&background=fff7ed&color=f97316&size=400&bold=true`
//       : business.companyImage || null,
//     verified: business.isAccountVerified,
//     badge: business.topRated ? "Top Rated" : null,
//   };

//   const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(cardData.name)}&background=fff7ed&color=f97316&size=400&bold=true`;

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       // for go to vendor id page
//       onClick={() => navigate(`/business/${cardData.id}`)}

//       // for go to no vendor found page
//       // onClick={() => navigate(`/business/${business.id}`)}

//       className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-300"
//       style={{
//         transition:
//           "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
//         transform: hovered
//           ? "translateY(-5px) scale(1.015)"
//           : "translateY(0) scale(1)",
//         boxShadow: hovered
//           ? "0 24px 48px rgba(249, 115, 22, 0.15), 0 8px 20px rgba(0,0,0,0.08)"
//           : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
//         animationDelay: `${index * 0.07}s`,
//         animation: "fadeSlideUp 0.5s ease both",
//       }}
//     >
//       {/* Image Section */}
//       <div className="relative overflow-hidden h-[185px] bg-orange-50 shrink-0">
//         <img
//           src={cardData.image || fallbackImage}
//           alt={cardData.name}
//           onError={() => setImgError(true)}
//           className="w-full h-full object-cover"
//           style={{
//             transition: "transform 0.5s ease",
//             transform: hovered ? "scale(1.06)" : "scale(1)",
//           }}
//         />

//         {/* Gradient overlay */}
//         <div
//           className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
//           style={{ opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }}
//         />

//         {/* Category pill - top left */}
//         <div className="absolute top-3 left-3">
//           <span className="bg-orange-500 text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-md leading-none">
//             {cardData.category}
//           </span>
//         </div>

//         {/* Top Rated badge - top right */}
//         {cardData.badge && (
//           <div className="absolute top-3 right-3 flex items-center gap-1 bg-white text-orange-500 text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-orange-100">
//             <TrendingUp className="w-2.5 h-2.5" />
//             {cardData.badge}
//           </div>
//         )}

//         {/* Verified badge - bottom right */}
//         {cardData.verified && (
//           <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/95 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-green-100">
//             <BadgeCheck className="w-3 h-3" />
//             Verified
//           </div>
//         )}
//       </div>

//       {/* Card Body */}
//       <div className="px-4 py-3.5 flex flex-col gap-2 flex-1">
//         {/* Business Name */}
//         <h3
//           className="font-bold text-[13.5px] leading-snug truncate transition-colors duration-200"
//           style={{ color: hovered ? "#f97316" : "#111827" }}
//         >
//           {cardData.name}
//         </h3>

//         {/* Location */}
//         <div className="flex items-start gap-1.5 text-gray-400 text-[11.5px]">
//           <MapPin className="w-3 h-3 text-orange-400 shrink-0 mt-0.5" />
//           <span className="truncate leading-snug">{cardData.location}</span>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-100 mt-auto pt-2.5">
//           {/* Rating row */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md tabular-nums">
//                 {Number(cardData.rating).toFixed(1)}
//               </span>
//               <StarRating rating={cardData.rating} />
//             </div>
//             {cardData.reviews > 0 && (
//               <span className="text-gray-400 text-[11px]">
//                 {cardData.reviews} reviews
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
//       <div className="h-[185px] bg-gray-100" />
//       <div className="px-4 py-3.5 space-y-3">
//         <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
//         <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
//         <div className="h-3 bg-gray-100 rounded-lg w-1/3 mt-4" />
//       </div>
//     </div>
//   );
// }

// export default function TopRatedBusinesses() {
//   const dispatch = useDispatch();
//   const { selectedCity } = useSelector((state) => state.location);
//   const { vendors, loading, error } = useSelector((state) => state.topRatedVendors);

//   useEffect(() => {
//     dispatch(fetchTopRatedVendors());
//   }, [dispatch]);

//   return (
//     <section
//       className="py-14 px-4 bg-white"
//       style={{ fontFamily: "'DM Sans', sans-serif" }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
//         rel="stylesheet"
//       />

//       <div className="max-w-screen-xl mx-auto">
//         {/* Section Header */}
//         <div className="mb-10 text-center">
//           <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-500 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-widest">
//             <TrendingUp className="w-3.5 h-3.5" />
//             Top Picks
//           </div>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//             Top Rated Businesses in
//             <span className="text-orange-500"> {selectedCity}</span>
//           </h2>
//           <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
//             Handpicked and trusted by thousands of local customers
//           </p>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-12">
//             <div className="inline-flex flex-col items-center gap-2">
//               <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
//                 <span className="text-red-400 text-lg">!</span>
//               </div>
//               <p className="text-red-400 text-sm font-medium">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
//           {loading
//             ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
//             : (vendors||[]).map((vendor, i) => (
//                 <BusinessCard key={vendor._id} business={vendor} index={i} />
//               ))}
//         </div>

//         {/* Empty State */}
//         {!loading && !error && (vendors||[]).length === 0 && (
//           <div className="text-center py-16 text-gray-400">
//             <p className="text-sm">No top rated businesses found.</p>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Star, Loader2, BadgeCheck, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchTopRatedVendors } from "../../../redux/slice/topRatedVendor/getAllTopRatedVendorSlice";
import { SEO } from "../../../hooks/useSEO";

const createSlug = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function StarRating({ rating = 5 }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          fill={star <= Math.round(rating) ? "#f97316" : "#d1d5db"}
          stroke="none"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function BusinessCard({ business, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cardData = {
    id: business._id,
    venId: business.venId,
    name: business.companyName || business.name || "Unknown Business",
    category: business.category || "Service Provider",
    city:
      business.addressInfo?.city ||
      business.addressInfo?.officeAddress ||
      "india",
    location:
      [business.addressInfo?.officeAddress, business.addressInfo?.city]
        .filter(Boolean)
        .join(", ") || "Nagpur",
    rating: business.rating || 5.0,
    reviews: business.reviewCount || 0,
    image: imgError
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(business.companyName || "B")}&background=fff7ed&color=f97316&size=400&bold=true`
      : business.companyImage || null,
    verified: business.isAccountVerified,
    badge: business.topRated ? "Top Rated" : null,
  };

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(cardData.name)}&background=fff7ed&color=f97316&size=400&bold=true`;

  const handleClick = () => {
    const venId = cardData.venId;
    const city = createSlug(cardData.city);
    const slug = createSlug(cardData.name);
    if (!venId) return;
    if (cardData.id) sessionStorage.setItem(`vendor_${venId}`, cardData.id);
    navigate(`/business/${city}/${venId}/${slug}`);
  };

  // ✅ JSON-LD structured data per card
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: cardData.name,
    image: cardData.image || fallbackImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: cardData.city,
      addressCountry: "IN",
    },
    aggregateRating:
      cardData.reviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(cardData.rating).toFixed(1),
            reviewCount: cardData.reviews,
          }
        : undefined,
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`View ${cardData.name} — ${cardData.category} in ${cardData.city}`}
      className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-300"
      style={{
        transition:
          "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        transform: hovered
          ? "translateY(-5px) scale(1.015)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 24px 48px rgba(249, 115, 22, 0.15), 0 8px 20px rgba(0,0,0,0.08)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        animationDelay: `${index * 0.07}s`,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      {/* ✅ JSON-LD per card */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Image Section */}
      <div className="relative overflow-hidden h-[185px] bg-orange-50 shrink-0">
        <img
          src={cardData.image || fallbackImage}
          alt={`${cardData.name} — ${cardData.category} in ${cardData.city}`}
          onError={() => setImgError(true)}
          loading={index < 4 ? "eager" : "lazy"}
          width={400}
          height={185}
          className="w-full h-full object-cover"
          style={{
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          style={{ opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s" }}
          aria-hidden="true"
        />

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-lg shadow-md leading-none">
            {cardData.category}
          </span>
        </div>

        {/* Top Rated badge */}
        {cardData.badge && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white text-orange-500 text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-orange-100">
            <TrendingUp className="w-2.5 h-2.5" aria-hidden="true" />
            {cardData.badge}
          </div>
        )}

        {/* Verified badge */}
        {cardData.verified && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/95 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-green-100">
            <BadgeCheck className="w-3 h-3" aria-hidden="true" />
            Verified
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-4 py-3.5 flex flex-col gap-2 flex-1">
        <h3
          className="font-bold text-[13.5px] leading-snug truncate transition-colors duration-200"
          style={{ color: hovered ? "#f97316" : "#111827" }}
        >
          {cardData.name}
        </h3>

        <div className="flex items-start gap-1.5 text-gray-400 text-[11.5px]">
          <MapPin
            className="w-3 h-3 text-orange-400 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="truncate leading-snug">{cardData.location}</span>
        </div>

        <div className="border-t border-gray-100 mt-auto pt-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md tabular-nums">
                {Number(cardData.rating).toFixed(1)}
              </span>
              <StarRating rating={cardData.rating} />
            </div>
            {cardData.reviews > 0 && (
              <span className="text-gray-400 text-[11px]">
                {cardData.reviews} reviews
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
      aria-hidden="true"
    >
      <div className="h-[185px] bg-gray-100" />
      <div className="px-4 py-3.5 space-y-3">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
        <div className="h-3 bg-gray-100 rounded-lg w-1/3 mt-4" />
      </div>
    </div>
  );
}

export default function TopRatedBusinesses() {
  const dispatch = useDispatch();
  const { selectedCity } = useSelector((state) => state.location);
  const { vendors, loading, error } = useSelector(
    (state) => state.topRatedVendors,
  );

  useEffect(() => {
    dispatch(fetchTopRatedVendors());
  }, [dispatch]);

  // ✅ SEO dynamic values
  const pageTitle = `Top Rated Businesses in ${selectedCity} | Local Trade Street`;
  const pageDescription = `Discover the best and most trusted businesses in ${selectedCity}. Handpicked top-rated service providers with verified reviews on Local Trade Street.`;
  const canonicalUrl = `https://www.localtradestreet.com/top-rated/${createSlug(selectedCity)}`;
  const ogImage = "https://www.localtradestreet.com/og-top-rated.jpg"; // ✅ replace with real OG image

  return (
    <>
      {/* ✅ SEO Hook */}
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        ogImage={ogImage}
        ogType="website"
      />

      <section
        className="py-14 px-4 bg-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <div className="max-w-screen-xl mx-auto">
          <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-500 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-widest">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              Top Picks
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Top Rated Businesses in
              <span className="text-orange-500"> {selectedCity}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
              Handpicked and trusted by thousands of local customers
            </p>
          </header>

          {error && (
            <div className="text-center py-12" role="alert">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <span className="text-red-400 text-lg" aria-hidden="true">
                    !
                  </span>
                </div>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            aria-label="Top rated businesses list"
          >
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : (vendors || []).map((vendor, i) => (
                  <BusinessCard key={vendor._id} business={vendor} index={i} />
                ))}
          </div>

          {!loading && !error && (vendors || []).length === 0 && (
            <div className="text-center py-16 text-gray-400" role="status">
              <p className="text-sm">
                No top rated businesses found in {selectedCity}.
              </p>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(22px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </>
  );
}
