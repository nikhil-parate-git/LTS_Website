import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Nagpur",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4",
    text: "Outstanding service! I found the perfect interior designer through LocalTradeStreet within minutes. The business was verified, the team was professional, and the results exceeded my expectations. Highly recommend this platform!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffd5dc",
    text: "Great platform for discovering local businesses! Found an amazing caterer for my wedding through LocalTradeStreet. The reviews were accurate and the booking process was seamless. Will definitely use it again.",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Bangalore",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=c0aede",
    text: "Reliable and efficient! Needed a pest control service urgently and LocalTradeStreet showed me verified options near my area instantly. The service provider was prompt, knowledgeable, and very reasonably priced.",
  },
  {
    id: 4,
    name: "Sonia Reddy",
    location: "Hyderabad",
    rating: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonia&backgroundColor=d1f4d1",
    text: "Professional team with excellent listings! Found a top-rated legal consultant through LocalTradeStreet. The verified badge gave me confidence and the professional delivered exactly what was promised. Great platform!",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=fde68a",
    text: "LocalTradeStreet helped me find the best movers and packers for my relocation. The listing details were accurate, pricing was transparent, and the team handled everything with care. Saved me so much time and stress!",
  },
  {
    id: 6,
    name: "Meera Nair",
    location: "Chennai",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera&backgroundColor=fecaca",
    text: "I found an amazing spa and beauty salon through LocalTradeStreet. The reviews were genuine and helped me make the right choice. The business was exactly as described — clean, professional, and excellent service!",
  },
  {
    id: 7,
    name: "Arjun Kapoor",
    location: "Kolkata",
    rating: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=bfdbfe",
    text: "Used LocalTradeStreet to find a digital marketing agency for my small business. The platform made it easy to compare options, read real reviews, and connect directly. Our online presence has grown significantly since!",
  },
  {
    id: 8,
    name: "Deepa Iyer",
    location: "Ahmedabad",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepa&backgroundColor=d9f99d",
    text: "Exceptional experience! LocalTradeStreet connected me with a fantastic architect for my home renovation. The platform is intuitive, the listings are detailed, and the verified reviews helped me choose with confidence.",
  },
];

function StarRating({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={size}
          fill={s <= rating ? "#f97316" : "#e5e7eb"}
          stroke="none"
        />
      ))}
    </div>
  );
}

const VISIBLE = 4; // cards visible at once

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null); // "left" | "right"
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRef = useRef(null);

  const total = reviews.length;
  const maxIndex = total - VISIBLE;

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
    }, 350);
  };

  const next = () => goTo(current + 1, "left");
  const prev = () => goTo(current - 1, "right");

  // Auto-slide every 4s
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1 > maxIndex ? 0 : c + 1;
        return next;
      });
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [maxIndex]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1 > maxIndex ? 0 : c + 1));
    }, 4000);
  };

  const visible = reviews.slice(current, current + VISIBLE);

  return (
    <section className="py-16 px-4 bg-gray-50 overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our <span className="text-orange-500">Customers Say</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Don't just take our word for it. See what satisfied customers have to say about LocalTradeStreet.
          </p>
        </div>

        {/* Cards row */}
        <div className="relative">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: `repeat(${VISIBLE}, minmax(0,1fr))`,
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${animDir === "left" ? "-24px" : "24px"})`
                : "translateX(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {visible.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 relative"
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-7 h-7 text-orange-100" fill="#ffedd5" stroke="none" />

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full border-2 border-orange-100 bg-orange-50 object-cover shrink-0"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Review text */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => { prev(); resetAuto(); }}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i, i > current ? "left" : "right"); resetAuto(); }}
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
            onClick={() => { next(); resetAuto(); }}
            disabled={current >= maxIndex}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Summary bar */}
       {/* Bottom CTA */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-orange-100">
          <div>
            <h3 className="text-white font-extrabold text-xl md:text-2xl leading-tight">
              Ready to find the best local businesses?
            </h3>
            <p className="text-orange-100 text-sm mt-1">
              Join 2M+ users who discover trusted businesses on LocalTradeStreet every month.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button className="bg-white text-orange-500 font-bold text-sm px-6 py-3 rounded-xl hover:bg-orange-50 transition-all duration-200 shadow hover:scale-105">
              Explore Businesses →
            </button>
            <button className="border-2 border-white text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
              List Your Business Free
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: show 1 card */}
      <style>{`
        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 640px) {
          .grid { grid-template-columns: repeat(1, minmax(0,1fr)) !important; }
        }
      `}</style>
    </section>
  );
}