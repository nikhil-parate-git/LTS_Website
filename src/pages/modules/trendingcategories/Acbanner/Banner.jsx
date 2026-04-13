// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { Beaker, ChevronLeft, ChevronRight } from "lucide-react";
// const INTERVAL = 1500;

// const FALLBACK = [
//   {
//     url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
//     title: null,
//     tag: null,
//   },
// ];

// function BannerSkeleton() {
//   return (
//     <div
//       className="relative w-full overflow-hidden"
//       style={{ height: "clamp(200px, 44vw, 440px)" }}
//     >
//       <style>{`
//         @keyframes skshimmer {
//           0%   { background-position: -800px 0; }
//           100% { background-position:  800px 0; }
//         }
//         .sk-base {
//           background: #e2e8f0;
//           background-image: linear-gradient(
//             90deg,
//             #e2e8f0 0px,
//             #edf2f7 200px,
//             #e2e8f0 400px
//           );
//           background-size: 800px 100%;
//           animation: skshimmer 1.4s infinite linear;
//         }
//       `}</style>

//       <div className="absolute inset-0 sk-base" />

//       <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 pb-7 sm:pb-12 flex flex-col gap-2.5">
//         <div className="sk-base rounded-full" style={{ width: 72, height: 22, opacity: 0.7 }} />
//         <div className="sk-base rounded-md" style={{ width: "clamp(160px, 32vw, 380px)", height: "clamp(18px, 3.2vw, 34px)", opacity: 0.6 }} />
//         <div className="sk-base rounded-md" style={{ width: "clamp(100px, 20vw, 240px)", height: "clamp(12px, 2vw, 22px)", opacity: 0.45 }} />
//       </div>

//       <div className="sk-base absolute left-3 top-1/2 -translate-y-1/2 rounded-full" style={{ width: 40, height: 40, opacity: 0.5 }} />
//       <div className="sk-base absolute right-3 top-1/2 -translate-y-1/2 rounded-full" style={{ width: 40, height: 40, opacity: 0.5 }} />

//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
//         <div className="sk-base rounded-full" style={{ width: 32, height: 10, opacity: 0.6 }} />
//         <div className="sk-base rounded-full" style={{ width: 10, height: 10, opacity: 0.4 }} />
//         <div className="sk-base rounded-full" style={{ width: 10, height: 10, opacity: 0.4 }} />
//         <div className="sk-base rounded-full" style={{ width: 10, height: 10, opacity: 0.4 }} />
//       </div>
//     </div>
//   );
// }

// function LazySlide({ slide, isActive, isPrev }) {
//   const [loaded, setLoaded] = useState(false);
//   const imageUrl = slide.image || slide.bannerImage || slide.url;

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
//         src={imageUrl}
//         alt={slide.title || "Banner"}
//         onLoad={() => setLoaded(true)}
//         className="w-full h-full object-cover"
//         style={{
//           transform: isActive ? "scale(1.06)" : "scale(1)",
//           transition: "transform 8s linear, opacity 0.7s ease",
//           filter: loaded ? "none" : "blur(6px)",
//         }}
//         loading="lazy"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//     </div>
//   );
// }

// export default function Banner({ banners, loading = false, pageTitle = "", selectedCity = "" }) {
//   const hasRealBanners = Array.isArray(banners) && banners.length > 0;

//   // City wise filter
//   const cityFilteredBanners = hasRealBanners && selectedCity
//     ? banners.filter(
//         (b) => b.city && b.city.toLowerCase() === selectedCity.toLowerCase()
//       )
//     : banners;

//   const filteredBanners =
//     Array.isArray(cityFilteredBanners) && cityFilteredBanners.length > 0
//       ? cityFilteredBanners
//       : hasRealBanners
//       ? banners
//       : FALLBACK;

//   const displaySlides = filteredBanners.length > 0 ? filteredBanners : FALLBACK;

//   const [current, setCurrent] = useState(0);
//   const [prev, setPrev] = useState(null);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     setCurrent(0);
//     setPrev(null);
//   }, [selectedCity, hasRealBanners]);

//   const goTo = useCallback(
//     (index) => {
//       setPrev(current);
//       setCurrent(index);
//     },
//     [current],
//   );

//   const goNext = useCallback(() => {
//     goTo((current + 1) % displaySlides.length);
//   }, [current, goTo, displaySlides.length]);

//   const goPrev = useCallback(() => {
//     goTo((current - 1 + displaySlides.length) % displaySlides.length);
//   }, [current, goTo, displaySlides.length]);

//   useEffect(() => {
//     if (isPaused || displaySlides.length <= 1) return;
//     const t = setInterval(goNext, INTERVAL);
//     return () => clearInterval(t);
//   }, [goNext, isPaused, displaySlides.length]);

//   if (loading) return <BannerSkeleton />;

//   const activeSlide = displaySlides[current] || displaySlides[0] || FALLBACK[0];

//   const displayTitle = activeSlide.title || pageTitle || null;

//   return (
//     <div
//       className="relative w-full overflow-hidden select-none"
//       style={{ height: "clamp(200px, 44vw, 440px)" }}
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <style>{`
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .slide-text { animation: slideUp 0.55s ease forwards; }
//       `}</style>

//       {displaySlides.map((slide, i) => (
//         <LazySlide
//           key={slide.id || slide._id || i}
//           slide={slide}
//           isActive={i === current}
//           isPrev={i === prev}
//         />
//       ))}

//       <div
//         key={current}
//         className="absolute inset-0 z-10 flex flex-col justify-end px-5 sm:px-10 pb-7 sm:pb-12 pointer-events-none"
//       >
//         {activeSlide.tag && (
//           <span className="slide-text inline-flex self-start bg-orange-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full mb-2">
//             {activeSlide.tag}
//           </span>
//         )}
//         {displayTitle && (
//           <h2
//             className="slide-text text-white font-extrabold"
//             style={{ fontSize: "clamp(18px, 4vw, 36px)" }}
//           >
//             {displayTitle}
//           </h2>
//         )}
//       </div>

//       {displaySlides.length > 1 && (
//         <>
//           <button
//             onClick={goPrev}
//             className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={goNext}
//             className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {displaySlides.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
//           {displaySlides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => goTo(i)}
//               className={`h-2.5 rounded-full transition-all duration-300 ${
//                 i === current
//                   ? "w-8 bg-orange-500 shadow-lg"
//                   : "w-2 bg-white/40 hover:bg-white/70"
//               }`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL = 3500; // 1.5s is too fast, 3.5s is optimal

const FALLBACK = [
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    title: null,
    tag: null,
  },
];

// Moving animations to a single style tag to prevent re-injection on every render
const GlobalBannerStyles = () => (
  <style>{`
    @keyframes skshimmer {
      0% { background-position: -800px 0; }
      100% { background-position: 800px 0; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .sk-base {
      background: #e2e8f0;
      background-image: linear-gradient(90deg, #e2e8f0 0px, #edf2f7 200px, #e2e8f0 400px);
      background-size: 800px 100%;
      animation: skshimmer 1.4s infinite linear;
    }
    .slide-text { animation: slideUp 0.55s ease forwards; }
    .gpu-accelerated { transform: translateZ(0); will-change: transform; }
  `}</style>
);

function BannerSkeleton() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(200px, 44vw, 440px)" }}>
      <GlobalBannerStyles />
      <div className="absolute inset-0 sk-base" />
      <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 pb-7 sm:pb-12 flex flex-col gap-2.5">
        <div className="sk-base rounded-full w-[72px] h-[22px] opacity-70" />
        <div className="sk-base rounded-md w-[clamp(160px,32vw,380px)] h-[clamp(18px,3.2vw,34px)] opacity-60" />
        <div className="sk-base rounded-md w-[clamp(100px,20vw,240px)] h-[clamp(12px,2vw,22px)] opacity-45" />
      </div>
    </div>
  );
}

// Memoized Slide to prevent unnecessary re-renders
const LazySlide = memo(({ slide, isActive }) => {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = slide.image || slide.bannerImage || slide.url;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <img
        src={imageUrl}
        alt={slide.title || "Banner"}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover gpu-accelerated transition-transform duration-[8000ms] linear ${
          isActive ? "scale-105" : "scale-100"
        }`}
        style={{ filter: loaded ? "none" : "blur(8px)" }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
    </div>
  );
});

export default function Banner({ banners, loading = false, pageTitle = "", selectedCity = "" }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Filter Logic
  const hasRealBanners = Array.isArray(banners) && banners.length > 0;
  const displaySlides = hasRealBanners 
    ? (selectedCity ? banners.filter(b => b.city?.toLowerCase() === selectedCity.toLowerCase()) : banners)
    : FALLBACK;

  const finalSlides = displaySlides.length > 0 ? displaySlides : (hasRealBanners ? banners : FALLBACK);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % finalSlides.length);
  }, [finalSlides.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + finalSlides.length) % finalSlides.length);
  }, [finalSlides.length]);

  const goTo = (index) => setCurrent(index);

  // Optimized Timer Logic
  useEffect(() => {
    if (isPaused || finalSlides.length <= 1) return;
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [goNext, isPaused, finalSlides.length]);

  // Reset when city changes
  useEffect(() => {
    setCurrent(0);
  }, [selectedCity]);

  if (loading) return <BannerSkeleton />;

  const activeSlide = finalSlides[current] || finalSlides[0];
  const displayTitle = activeSlide.title || pageTitle || null;

  return (
    <div
      className="relative w-full overflow-hidden select-none bg-gray-200"
      style={{ height: "clamp(200px, 44vw, 440px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <GlobalBannerStyles />

      {finalSlides.map((slide, i) => (
        <LazySlide
          key={slide.id || slide._id || i}
          slide={slide}
          isActive={i === current}
        />
      ))}

      {/* Content */}
      <div key={current} className="absolute inset-0 z-20 flex flex-col justify-end px-5 sm:px-10 pb-7 sm:pb-12 pointer-events-none">
        {activeSlide.tag && (
          <span className="slide-text inline-flex self-start bg-orange-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-full mb-2">
            {activeSlide.tag}
          </span>
        )}
        {displayTitle && (
          <h2 className="slide-text text-white font-extrabold leading-tight" style={{ fontSize: "clamp(18px, 4.5vw, 38px)" }}>
            {displayTitle}
          </h2>
        )}
      </div>

      {/* Navigation */}
      {finalSlides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {finalSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-orange-500 shadow-md" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}