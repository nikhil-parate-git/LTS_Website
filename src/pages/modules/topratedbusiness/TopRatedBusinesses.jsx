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
          className="w-3 h-3 sm:w-3.5 sm:h-3.5"
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
      className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-300 flex flex-col"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Image Section */}
      <div className="relative overflow-hidden h-[140px] sm:h-[165px] md:h-[185px] bg-orange-50 shrink-0">
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
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="bg-orange-500 text-white text-[9px] sm:text-[10.5px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md leading-none">
            {cardData.category}
          </span>
        </div>

        {/* Top Rated badge */}
        {cardData.badge && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-0.5 sm:gap-1 bg-white text-orange-500 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md border border-orange-100">
            <TrendingUp
              className="w-2 h-2 sm:w-2.5 sm:h-2.5"
              aria-hidden="true"
            />
            {cardData.badge}
          </div>
        )}

        {/* Verified badge */}
        {cardData.verified && (
          <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 flex items-center gap-0.5 sm:gap-1 bg-white/95 text-green-600 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow border border-green-100">
            <BadgeCheck
              className="w-2.5 h-2.5 sm:w-3 sm:h-3"
              aria-hidden="true"
            />
            Verified
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3.5 flex flex-col gap-1.5 sm:gap-2 flex-1">
        <h3
          className="font-bold text-[12px] sm:text-[13.5px] leading-snug truncate transition-colors duration-200"
          style={{ color: hovered ? "#f97316" : "#111827" }}
        >
          {cardData.name}
        </h3>

        <div className="flex items-start gap-1 sm:gap-1.5 text-gray-400 text-[10px] sm:text-[11.5px]">
          <MapPin
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <span className="truncate leading-snug">{cardData.location}</span>
        </div>

        <div className="border-t border-gray-100 mt-auto pt-2 sm:pt-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="bg-orange-500 text-white text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md tabular-nums">
                {Number(cardData.rating).toFixed(1)}
              </span>
              <StarRating rating={cardData.rating} />
            </div>
            {cardData.reviews > 0 && (
              <span className="text-gray-400 text-[9px] sm:text-[11px]">
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
      <div className="h-[140px] sm:h-[165px] md:h-[185px] bg-gray-100" />
      <div className="px-3 sm:px-4 py-2.5 sm:py-3.5 space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-2.5 sm:h-3 bg-gray-100 rounded-lg w-1/2" />
        <div className="h-2.5 sm:h-3 bg-gray-100 rounded-lg w-1/3 mt-3 sm:mt-4" />
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

  const pageTitle = `Top Rated Businesses in ${selectedCity} | Local Trade Street`;
  const pageDescription = `Discover the best and most trusted businesses in ${selectedCity}. Handpicked top-rated service providers with verified reviews on Local Trade Street.`;
  const canonicalUrl = `https://www.localtradestreet.com/top-rated/${createSlug(selectedCity)}`;
  const ogImage = "https://www.localtradestreet.com/og-top-rated.jpg";

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        ogImage={ogImage}
        ogType="website"
      />

      <section
        className="py-10 sm:py-12 md:py-14 px-3 sm:px-4 bg-white"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <div className="max-w-screen-xl mx-auto">
          <header className="mb-6 sm:mb-8 md:mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-orange-50 border border-orange-100 text-orange-500 text-[10px] sm:text-xs font-semibold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3 uppercase tracking-widest">
              <TrendingUp
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                aria-hidden="true"
              />
              Top Picks
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight px-2">
              Top Rated Businesses By{" "}
              <span className="text-orange-500">Local Trade Street</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2 max-w-xs sm:max-w-md mx-auto px-4">
              Handpicked and trusted by thousands of local customers
            </p>
          </header>

          {error && (
            <div className="text-center py-10 sm:py-12" role="alert">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <span
                    className="text-red-400 text-base sm:text-lg"
                    aria-hidden="true"
                  >
                    !
                  </span>
                </div>
                <p className="text-red-400 text-xs sm:text-sm font-medium">
                  {error}
                </p>
              </div>
            </div>
          )}

          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
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
            <div
              className="text-center py-12 sm:py-16 text-gray-400"
              role="status"
            >
              <p className="text-xs sm:text-sm">
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
