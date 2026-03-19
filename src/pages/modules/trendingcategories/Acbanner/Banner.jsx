// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
//     title: "Find Trusted Local Services",
//     subtitle: "Connect with verified professionals in your city",
//     tag: "Home Services",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&q=80",
//     title: "Top-Rated Businesses Near You",
//     subtitle: "Thousands of verified local businesses at your fingertips",
//     tag: "Highly Rated",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
//     title: "Book Services Instantly",
//     subtitle: "Fast, reliable, and affordable service booking",
//     tag: "Instant Booking",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
//     title: "Expert Professionals",
//     subtitle: "Skilled and background-verified service experts",
//     tag: "Verified Experts",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&q=80",
//     title: "Across 500+ Cities in India",
//     subtitle: "Local Trade Street — India's fastest growing business platform",
//     tag: "Pan India",
//   },
// ];

// const INTERVAL = 4500;

// // ── Slide with lazy loading ──────────────────────────────────────
// function LazySlide({ slide, isActive, isPrev }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div
//       className="absolute inset-0 transition-opacity duration-700 ease-in-out"
//       style={{
//         opacity: isActive ? 1 : 0,
//         zIndex: isActive ? 2 : isPrev ? 1 : 0,
//         pointerEvents: isActive ? "auto" : "none",
//       }}
//     >
//       <img
//         src={slide.url}
//         alt={slide.title}
//         onLoad={() => setLoaded(true)}
//         className="w-full h-full object-cover"
//         style={{
//           transform: isActive ? "scale(1.06)" : "scale(1)",
//           transition: "transform 8s linear, opacity 0.7s ease",
//           filter: loaded ? "none" : "blur(6px)",
//         }}
//         loading="lazy"
//         decoding="async"
//       />
//       {/* Gradient overlays */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//       <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
//     </div>
//   );
// }

// // ── Banner ───────────────────────────────────────────────────────
// export default function Banner() {
//   const [current, setCurrent] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);
//   const timerRef = useRef(null);

//   const goTo = useCallback((index) => {
//     setPrev(current);
//     setCurrent(index);
//   }, [current]);

//   const goNext = useCallback(() => {
//     goTo((current + 1) % slides.length);
//   }, [current, goTo]);

//   const goPrev = useCallback(() => {
//     goTo((current - 1 + slides.length) % slides.length);
//   }, [current, goTo]);

//   // Auto-advance
//   useEffect(() => {
//     if (isPaused) return;
//     timerRef.current = setInterval(goNext, INTERVAL);
//     return () => clearInterval(timerRef.current);
//   }, [goNext, isPaused]);

//   // Keyboard nav
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "ArrowLeft") goPrev();
//       if (e.key === "ArrowRight") goNext();
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [goNext, goPrev]);

//   const activeSlide = slides[current];

//   return (
//     <div
//       className="relative w-full overflow-hidden select-none"
//       style={{ height: "clamp(200px, 44vw, 460px)" }}
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       role="region"
//       aria-label="Image carousel"
//     >
//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .slide-text { animation: slideUp 0.55s ease forwards; }
//       `}</style>

//       {/* ── Slides ── */}
//       {slides.map((slide, i) => (
//         <LazySlide
//           key={i}
//           slide={slide}
//           isActive={i === current}
//           isPrev={i === prev}
//         />
//       ))}

//       {/* ── Text Content ── */}
//       <div
//         key={current}
//         className="absolute inset-0 z-10 flex flex-col justify-end px-5 sm:px-10 lg:px-16 pb-7 sm:pb-12 pointer-events-none"
//       >
//         <span
//           className="slide-text inline-flex items-center gap-1.5 self-start bg-orange-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2 sm:mb-3"
//           style={{ animationDelay: "0ms" }}
//         >
//           {activeSlide.tag}
//         </span>
//         <h2
//           className="slide-text text-white font-extrabold leading-tight mb-1 sm:mb-2"
//           style={{ fontSize: "clamp(16px, 3.2vw, 38px)", animationDelay: "60ms" }}
//         >
//           {activeSlide.title}
//         </h2>
//         <p
//           className="slide-text text-white/75 font-medium hidden sm:block"
//           style={{ fontSize: "clamp(11px, 1.4vw, 16px)", animationDelay: "110ms" }}
//         >
//           {activeSlide.subtitle}
//         </p>
//       </div>

//       {/* ── Slide Counter ── */}
//       <div className="absolute top-4 right-4 z-20 bg-black/35 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/15 tabular-nums">
//         {current + 1} / {slides.length}
//       </div>

//       {/* ── Left Arrow ── */}
//       <button
//         onClick={goPrev}
//         className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-orange-500 backdrop-blur-sm border border-white/20 hover:border-orange-400 text-white transition-all duration-200 hover:scale-110 active:scale-95"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//       </button>

//       {/* ── Right Arrow ── */}
//       <button
//         onClick={goNext}
//         className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-orange-500 backdrop-blur-sm border border-white/20 hover:border-orange-400 text-white transition-all duration-200 hover:scale-110 active:scale-95"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
//       </button>

//       {/* ── Dot Indicators ── */}
//       <div className="absolute bottom-4 right-5 sm:right-10 lg:right-16 z-20 flex items-center gap-2">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             aria-label={`Slide ${i + 1}`}
//             className={`rounded-full border-2 transition-all duration-300 ${
//               i === current
//                 ? "bg-orange-500 border-orange-500 w-6 h-2.5 sm:w-8 sm:h-3"
//                 : "bg-white/40 border-white/40 hover:bg-white/70 w-2.5 h-2.5 sm:w-3 sm:h-3"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect, useCallback, useRef } from "react";
import { Beaker, ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL = 4500;

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