import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
  "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&q=80",
];

function Banner() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
   <div className="relative w-full h-[40vh] overflow-hidden rounded-2xl">

      {/* Image */}
      <img
        src={slides[current]}
        alt="slide"
        className="w-full h-full object-cover   transition-all duration-700"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-2xl" />

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500 text-white rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500 text-white rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "bg-orange-500 w-8 h-3"
                : "bg-white/70 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;