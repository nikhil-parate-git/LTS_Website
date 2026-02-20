import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: 50000, suffix: "+", label: "Businesses Listed" },
  { value: 2, suffix: "M+", label: "Monthly Visitors" },
  { value: 500, suffix: "+", label: "Cities Covered" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

const perks = [
  { icon: "🎯", title: "Targeted Reach", desc: "Appear in front of customers actively searching for your services nearby." },
  { icon: "📈", title: "Grow Faster", desc: "Businesses on IndiaOnline see up to 3x more inquiries within 30 days." },
  { icon: "⭐", title: "Build Trust", desc: "Collect reviews, showcase photos, and build a credible online presence." },
  { icon: "🆓", title: "Free to Start", desc: "List your business at zero cost. Upgrade anytime for premium visibility." },
];

// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, animate }) {
  const count = useCounter(value, 1800, animate);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-orange-500 tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function ListBusiness() {
  const navigate = useNavigate();
  const [animateStats, setAnimateStats] = useState(false);
  const [activePerk, setActivePerk] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Trigger stat counters when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimateStats(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-0"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Top orange accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-14 md:py-20">

        {/* ── MAIN CONTENT ROW ── */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* LEFT: Image with floating badge */}
          <div className="relative w-full md:w-[45%] shrink-0">
            {/* Decorative orange shape behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-orange-100 z-0" />

            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=85"
                alt="Business owner listing on IndiaOnline"
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-[340px] md:h-[420px] object-cover transition-all duration-700 ${imgLoaded ? "scale-100 blur-0" : "scale-105 blur-sm"}`}
              />
              {/* Dark overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge: FREE */}
            <div className="absolute -top-3 -right-3 z-20 bg-orange-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg rotate-12 tracking-widest uppercase">
              100% Free
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -right-4 z-20 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-orange-100">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">📍</div>
              <div>
                <div className="text-gray-800 font-bold text-sm leading-tight">500+ Cities</div>
                <div className="text-gray-400 text-xs">All across India</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Text + CTA */}
          <div className="flex-1 mt-6 md:mt-0">
            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-orange-200 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
              For Business Owners
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Get your business<br />
              in front of{" "}
              <span className="text-orange-500 relative inline-block">
                local customers
                {/* Underline squiggle */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 Q50 2 100 6 Q150 10 198 4" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              .
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-lg">
              Maximize opportunities for shoppers to find you by listing your business on <span className="font-semibold text-gray-700">IndiaOnline</span> — India's fastest-growing local search platform.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {perks.map((p, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActivePerk(i)}
                  onMouseLeave={() => setActivePerk(null)}
                  className={`rounded-xl p-3 border transition-all duration-250 cursor-default
                    ${activePerk === i
                      ? "border-orange-300 bg-orange-50 shadow-md -translate-y-0.5"
                      : "border-gray-100 bg-gray-50 hover:border-orange-200"
                    }`}
                >
                  <div className="text-xl mb-1">{p.icon}</div>
                  <div className="text-sm font-bold text-gray-800">{p.title}</div>
                  <div className={`text-xs text-gray-500 mt-0.5 leading-snug overflow-hidden transition-all duration-300 ${activePerk === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/list-business")}
                className="group relative bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-orange-300 overflow-hidden"
              >
                <span className="relative z-10">List Your Business Free →</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </button>

              <button
                onClick={() => navigate("/how-it-works")}
                className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors underline underline-offset-4"
              >
                How it works?
              </button>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="mt-16 md:mt-20 border-t border-dashed border-gray-200 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatItem key={i} {...s} animate={animateStats} />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom orange accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-500 to-orange-400" />
    </section>
  );
}