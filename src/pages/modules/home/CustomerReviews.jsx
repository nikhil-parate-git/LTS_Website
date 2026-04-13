import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Nagpur",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Outstanding service! I found the perfect interior designer through LocalTradeStreet within minutes. The business was verified, the team was professional, and the results exceeded my expectations. Highly recommend this platform!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Great platform for discovering local businesses! Found an amazing caterer for my wedding through LocalTradeStreet. The reviews were accurate and the booking process was seamless. Will definitely use it again.",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Reliable and efficient! Needed a pest control service urgently and LocalTradeStreet showed me verified options near my area instantly. The service provider was prompt, knowledgeable, and very reasonably priced.",
  },
  {
    id: 4,
    name: "Sonia Reddy",
    location: "Hyderabad",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Professional team with excellent listings! Found a top-rated legal consultant through LocalTradeStreet. The verified badge gave me confidence and the professional delivered exactly what was promised. Great platform!",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    text: "LocalTradeStreet helped me find the best movers and packers for my relocation. The listing details were accurate, pricing was transparent, and the team handled everything with care. Saved me so much time and stress!",
  },
  {
    id: 6,
    name: "Meera Nair",
    location: "Chennai",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    text: "I found an amazing spa and beauty salon through LocalTradeStreet. The reviews were genuine and helped me make the right choice. The business was exactly as described — clean, professional, and excellent service!",
  },
  {
    id: 7,
    name: "Arjun Kapoor",
    location: "Kolkata",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "Used LocalTradeStreet to find a digital marketing agency for my small business. The platform made it easy to compare options, read real reviews, and connect directly. Our online presence has grown significantly since!",
  },
  {
    id: 8,
    name: "Deepa Iyer",
    location: "Ahmedabad",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    text: "Exceptional experience! LocalTradeStreet connected me with a fantastic architect for my home renovation. The platform is intuitive, listings are detailed, and verified reviews helped me choose with confidence.",
  },
];

function StarRating({ rating }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="rev-star"
          fill={s <= rating ? "#f97316" : "#e5e7eb"}
          stroke="none"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 540) setCount(1);
      else if (window.innerWidth <= 768) setCount(2);
      else if (window.innerWidth <= 1024) setCount(3);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef(null);
  const visibleCount = useVisibleCount();

  const total = reviews.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // SEO: Schema Markup for Google
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "LocalTradeStreet Services",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating.toString() },
    })),
  };

  const goTo = (index, dir) => {
    if (isAnimating) return;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    if (clamped === current) return;
    setAnimDir(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(clamped);
      setIsAnimating(false);
      setAnimDir(null);
    }, 320);
  };

  const next = () => goTo(current + 1, "left");
  const prev = () => goTo(current - 1, "right");

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1 > maxIndex ? 0 : c + 1));
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [maxIndex]);

  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [maxIndex]);

  const visible = reviews.slice(current, current + visibleCount);

  return (
    <section
      className="rev-section py-16 px-4 bg-gray-50 overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
      aria-labelledby="reviews-heading"
    >
      {/* Schema Script Injection */}
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            id="reviews-heading"
            className="rev-title font-extrabold text-gray-900 leading-tight"
          >
            What Our <span className="text-orange-500">Customers Say</span>
          </h2>
          <p className="rev-subtitle text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. See what satisfied customers have
            to say about LocalTradeStreet.
          </p>
          <div
            className="mt-5 flex items-center justify-center gap-1.5"
            aria-hidden="true"
          >
            <div className="h-1 w-8 rounded-full bg-orange-200" />
            <div className="h-1 w-16 rounded-full bg-orange-500" />
            <div className="h-1 w-8 rounded-full bg-orange-200" />
          </div>
        </div>

        {/* Cards Wrapper - Semantic 'div' or 'ul' is fine here */}
        <div
          className="rev-grid"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${animDir === "left" ? "-20px" : "20px"})`
              : "translateX(0)",
            transition: "opacity 0.32s ease, transform 0.32s ease",
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0,1fr))`,
          }}
        >
          {visible.map((review) => (
            <article
              key={review.id}
              className="rev-card bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Top orange accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-orange-200" />

              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-4 w-8 h-8 opacity-60"
                fill="#ffedd5"
                stroke="#fed7aa"
                strokeWidth={0.5}
                aria-hidden="true"
              />

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={`Reviewer ${review.name}`}
                  className="rev-avatar rounded-full border-2 border-orange-200 object-cover shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=ffedd5&color=f97316&bold=true&size=96`;
                  }}
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {review.location}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Text */}
              <blockquote className="m-0">
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 flex-1">
                  "{review.text}"
                </p>
              </blockquote>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => {
              prev();
              startAuto();
            }}
            disabled={current === 0}
            aria-label="Previous Review"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 disabled:opacity-30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2 items-center" role="tablist">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  goTo(i, i > current ? "left" : "right");
                  startAuto();
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 10,
                  height: 10,
                  background: i === current ? "#f97316" : "#d1d5db",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              next();
              startAuto();
            }}
            disabled={current >= maxIndex}
            aria-label="Next Review"
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 disabled:opacity-30 transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        .rev-title     { font-size: 2rem; }
        .rev-subtitle  { font-size: 0.95rem; }
        .rev-grid      { display: grid; gap: 20px; }
        .rev-card      { padding: 24px; }
        .rev-avatar    { width: 52px; height: 52px; }
        .rev-star      { width: 16px; height: 16px; }

        @media (max-width: 1024px) {
          .rev-title { font-size: 1.75rem; }
          .rev-grid  { gap: 16px; }
        }
        @media (max-width: 768px) {
          .rev-title     { font-size: 1.5rem; }
          .rev-subtitle  { font-size: 0.875rem; }
          .rev-card      { padding: 18px; }
          .rev-avatar    { width: 44px; height: 44px; }
          .rev-grid      { gap: 14px; }
        }
        @media (max-width: 540px) {
          .rev-title   { font-size: 1.35rem; }
          .rev-card    { padding: 16px; }
          .rev-avatar  { width: 40px; height: 40px; }
          .rev-grid    { gap: 12px; }
          .rev-star    { width: 14px; height: 14px; }
        }
        @media (max-width: 360px) {
          .rev-title { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
}
