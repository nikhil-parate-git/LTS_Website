import React, { useState, useEffect, useCallback, useRef } from "react";
import { Beaker, ChevronLeft, ChevronRight } from "lucide-react";
const INTERVAL = 1500;

function LazySlide({ slide, isActive, isPrev }) {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = slide.image || slide.bannerImage || slide.url;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
      style={{
        opacity: isActive ? 1 : 0,
        zIndex: isActive ? 2 : isPrev ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <img
        src={imageUrl}
        alt={slide.title || "Banner"}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        style={{
          transform: isActive ? "scale(1.06)" : "scale(1)",
          transition: "transform 8s linear, opacity 0.7s ease",
          filter: loaded ? "none" : "blur(6px)",
        }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>
  );
}

export default function Banner({ banners = [] }) {
  console.log("Banner: ",banners)
  const displaySlides = banners.length > 0 ? banners : [
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80", title: "Welcome", tag: "Local Trade" }
  ];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setPrev(current);
    setCurrent(index);
  }, [current]);

  const goNext = useCallback(() => {
    goTo((current + 1) % displaySlides.length);
  }, [current, goTo, displaySlides.length]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + displaySlides.length) % displaySlides.length);
  }, [current, goTo, displaySlides.length]);

  useEffect(() => {
    if (isPaused || displaySlides.length <= 1) return;
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, displaySlides.length]);

  const activeSlide = displaySlides[current];

  return (
    <div
      className="relative w-full overflow-hidden select-none "
      style={{ height: "clamp(200px, 44vw, 440px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-text { animation: slideUp 0.55s ease forwards; }
      `}</style>

      {displaySlides.map((slide, i) => (
        <LazySlide
          key={slide.id || i}
          slide={slide}
          isActive={i === current}
          isPrev={i === prev}
        />
      ))}

      {/* Text Content */}
      <div key={current} className="absolute inset-0 z-10 flex flex-col justify-end px-5 sm:px-10 pb-7 sm:pb-12 pointer-events-none">
        {activeSlide.tag && (
          <span className="slide-text inline-flex self-start bg-orange-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full mb-2">
            {activeSlide.tag}
          </span>
        )}
        <h2 className="slide-text text-white font-extrabold" style={{ fontSize: "clamp(18px, 4vw, 36px)" }}>
          {activeSlide.title || "Quality Services Near You"}
        </h2>
      </div>

      {/* Navigation Arrows */}
      {displaySlides.length > 1 && (
        <>
          <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slider Dots (Pagination Progress) */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {displaySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current 
                  ? "w-8 bg-orange-500 shadow-lg" 
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
      

    </div>
  );
}