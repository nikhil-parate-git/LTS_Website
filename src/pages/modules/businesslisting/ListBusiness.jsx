import { useState, useEffect, useRef } from "react";
import AddVendorForm from "../../../components/nav/AddVendorForm";

const stats = [
  { value: 50000, suffix: "+", label: "Businesses Listed" },
  { value: 2, suffix: "M+", label: "Monthly Visitors" },
  { value: 500, suffix: "+", label: "Cities Covered" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

const perks = [
  {
    icon: "🎯",
    title: "Targeted Reach",
    desc: "Appear in front of customers actively searching for your services nearby.",
  },
  {
    icon: "📈",
    title: "Grow Faster",
    desc: "Businesses on Local Trade Street see up to 3x more inquiries within 30 days.",
  },
  {
    icon: "⭐",
    title: "Build Trust",
    desc: "Collect reviews, showcase photos, and build a credible online presence.",
  },
  {
    icon: "🆓",
    title: "Free to Start",
    desc: "List your business at zero cost. Upgrade anytime for premium visibility.",
  },
];

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
    <div className="text-center px-2">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-500 tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium leading-snug">
        {label}
      </div>
    </div>
  );
}

export default function ListBusiness() {
  const [animateStats, setAnimateStats] = useState(false);
  const [activePerk, setActivePerk] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [vendorFormOpen, setVendorFormOpen] = useState(false);
  const sectionRef = useRef(null);

  // SEO: Richer Schema with AggregateRating + Offer
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free Business Listing — Local Trade Street",
    serviceType: "Business Directory Listing",
    description:
      "List your local business for free on Local Trade Street — India's fastest-growing hyperlocal business directory. Get discovered by nearby customers across 500+ cities.",
    url: "https://localtradestreet.com/list-your-business",
    provider: {
      "@type": "Organization",
      name: "Local Trade Street",
      url: "https://localtradestreet.com",
      logo: "https://localtradestreet.com/logo.png",
      sameAs: [
        "https://www.facebook.com/localtradestreet",
        "https://www.instagram.com/localtradestreet",
      ],
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      description:
        "Free business listing with option to upgrade for premium visibility.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50000",
      bestRating: "5",
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateStats(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-0"
      style={{ fontFamily: "'Poppins', sans-serif" }}
      aria-labelledby="list-business-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* LEFT: Image */}
          <div className="relative w-full md:w-[45%] shrink-0">
            <div
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full rounded-3xl bg-orange-100 z-0"
              aria-hidden="true"
            />

            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=85"
                alt="Local business owner listing their business on Local Trade Street to attract nearby customers across India"
                onLoad={() => setImgLoaded(true)}
                loading="lazy"
                decoding="async"
                width="700"
                height="420"
                fetchPriority="low"
                className={`w-full h-[240px] sm:h-[300px] md:h-[420px] object-cover transition-all duration-700 ${
                  imgLoaded ? "scale-100 blur-0" : "scale-105 blur-sm"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Badge */}
            <div
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20 bg-orange-500 text-white font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg rotate-12 tracking-widest uppercase"
              aria-label="100% free listing"
            >
              100% Free Listing
            </div>

            {/* Cities card — hidden on very small screens */}
            <div
              className="flex absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 z-20 bg-white rounded-2xl shadow-xl px-3 sm:px-5 py-2.5 sm:py-4 items-center gap-2 sm:gap-3 border border-orange-100"
              aria-label="Available in 500+ cities across India"
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg sm:text-xl"
                aria-hidden="true"
              >
                📍
              </div>
              <div>
                <div className="text-gray-800 font-bold text-xs sm:text-sm leading-tight">
                  500+ Cities
                </div>
                <div className="text-gray-400 text-[11px] sm:text-xs">
                  All across India
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="flex-1 mt-4 sm:mt-6 md:mt-0 w-full">
            {/* Badge pill */}
            <p className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full mb-3 sm:mb-4 border border-orange-200 uppercase tracking-wider">
              <span
                className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block"
                aria-hidden="true"
              />
              Grow Your Business Online
            </p>

            <h1
              id="list-business-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4"
              itemProp="name"
            >
              Get your business in front of{" "}
              <span className="text-orange-500 relative inline-block">
                local customers
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M2 6 Q50 2 100 6 Q150 10 198 4"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h1>

            <p
              className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-lg"
              itemProp="description"
            >
              Boost your online visibility and get 3x more inquiries. List your
              business on{" "}
              <strong className="font-semibold text-gray-700">
                Local Trade Street
              </strong>{" "}
              today — India's fastest-growing hyperlocal business directory
              covering 500+ cities.
            </p>

            {/* Perks grid */}
            <div
              className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8"
              role="list"
              aria-label="Benefits of listing your business"
            >
              {perks.map((p, i) => (
                <div
                  key={i}
                  role="listitem"
                  onMouseEnter={() => setActivePerk(i)}
                  onMouseLeave={() => setActivePerk(null)}
                  onFocus={() => setActivePerk(i)}
                  onBlur={() => setActivePerk(null)}
                  tabIndex={0}
                  aria-label={`${p.title}: ${p.desc}`}
                  className={`rounded-xl p-2.5 sm:p-3 border transition-all duration-250 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-orange-400
                    ${
                      activePerk === i
                        ? "border-orange-300 bg-orange-50 shadow-md -translate-y-0.5"
                        : "border-gray-100 bg-gray-50 hover:border-orange-200"
                    }`}
                >
                  <div className="text-lg sm:text-xl mb-1" aria-hidden="true">
                    {p.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800">
                    {p.title}
                  </div>
                  <div
                    className={`text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-snug overflow-hidden transition-all duration-300 ${
                      activePerk === i
                        ? "max-h-20 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={activePerk !== i}
                  >
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setVendorFormOpen(true)}
                className="group cursor-pointer relative bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-orange-200 transition-all duration-300 hover:scale-105 hover:shadow-orange-300 overflow-hidden w-full xs:w-auto text-center"
                aria-label="Register your business for free on Local Trade Street"
              >
                <span className="relative z-10">List Your Business Free →</span>
                <div
                  className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div
          className="mt-12 sm:mt-16 md:mt-20 border-t border-dashed border-gray-200 pt-8 sm:pt-10"
          aria-label="Platform statistics"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((s, i) => (
              <StatItem key={i} {...s} animate={animateStats} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-500 to-orange-400" />

      {vendorFormOpen && (
        <AddVendorForm
          onClose={() => setVendorFormOpen(false)}
          onSuccess={() => {
            setVendorFormOpen(false);
            window.location.href = "https://vendor.localtradestreet.com/login";
          }}
        />
      )}
    </section>
  );
}
