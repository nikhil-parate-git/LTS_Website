import { useState, useEffect, useRef } from "react";
import Plans from "./Plans";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient, nascetur ridiculus mus. Donec quam felis, ultricies nec.",
    name: "Rahul Sharma",
    role: "Owner",
    company: "SS Rana Tours & Travels",
    location: "Vrindavan",
    avatar: "RS",
    accent: {
      bg: "#fff",
      border: "#e5e7eb",
      tag: "#f3f4f6",
      tagText: "#374151",
      star: "#f59e0b",
    },
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient, nascetur ridiculus mus. Donec quam felis, ultricies nec.",
    name: "Rajnish Kumar",
    role: "Director",
    company: "Detetika Naturopathy & Wellness Centre",
    location: "Vrindavan",
    avatar: "RK",
    accent: {
      bg: "#f0fdf4",
      border: "#bbf7d0",
      tag: "#dcfce7",
      tagText: "#166534",
      star: "#22c55e",
    },
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient, nascetur ridiculus mus. Donec quam felis, ultricies nec.",
    name: "Varun Singh",
    role: "Owner",
    company: "SS Rana Tours & Travels",
    location: "Vrindavan",
    avatar: "VS",
    accent: {
      bg: "#fff7ed",
      border: "#fed7aa",
      tag: "#ffedd5",
      tagText: "#9a3412",
      star: "#f97316",
    },
  },
];

const banners = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
    alt: "Interior room with boxes",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    alt: "Packers and movers",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80",
    alt: "Professional moving team",
  },
];

function LazyBannerImage({ src, alt, active }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const triggered = useRef(false);
  useEffect(() => {
    if (active && !triggered.current && imgRef.current) {
      triggered.current = true;
      imgRef.current.src = src;
    }
  }, [active, src]);
  return (
    <img
      ref={imgRef}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
      style={{ opacity: loaded ? 1 : 0 }}
    />
  );
}

function Stars({ color }) {
  return (
    <div className="flex gap-0.5 mb-2.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ContactModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
  });
  const reasons = [
    "Customized Business Listing",
    "Advertisements",
    "Partnership / Alliance / Tie-up",
    "Other",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-400 mb-5">
          Please fill the form below and we will soon get in touch with you
        </p>

        <div className="space-y-3">
          <label className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-50 transition-all cursor-text">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              placeholder="Enter your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </label>

          <label className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-50 transition-all cursor-text">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            <input
              type="email"
              placeholder="Enter your Email ID"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </label>

          <label className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-50 transition-all cursor-text">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="17" r="1" />
            </svg>
            <input
              type="tel"
              placeholder="Enter your Mobile No."
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </label>

          <label className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-50 transition-all">
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="flex-1 text-sm outline-none text-gray-500 bg-transparent cursor-pointer"
            >
              <option value="">Select your reason to contact us</option>
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-50 transition-all cursor-text">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 mt-0.5"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <div className="flex-1 relative">
              <textarea
                placeholder="Enter your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={100}
                rows={3}
                className="w-full text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent resize-none"
              />
              <span className="absolute bottom-0 right-0 text-xs text-gray-300">
                {form.message.length}/100
              </span>
            </div>
          </label>

          <button className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-100 text-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BusinessPage() {
  const [current, setCurrent] = useState(0);
  const [breadPath, setBreadPath] = useState(["Home", "List your Business"]);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="min-h-scree"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── BANNER ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "300px" }}
      >
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <LazyBannerImage
              src={banner.src}
              alt={banner.alt}
              active={i === current}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom,rgba(0,0,0,.28),rgba(0,0,0,.56))",
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/75 text-xs tracking-widest uppercase mb-2">
            Trusted Relocation Experts
          </p>
          <h1
            className="text-white font-extrabold leading-snug mb-5"
            style={{
              fontSize: "clamp(20px,3.5vw,32px)",
              textShadow: "0 2px 12px rgba(0,0,0,.5)",
            }}
          >
            Planning to shift your house? Looking for
            <br />
            <span className="text-orange-400">
              Reliable Packer &amp; Movers?
            </span>
          </h1>
          <button
            onClick={() => setShowContact(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-9 py-3 rounded-lg shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 text-sm"
          >
            List Your Business
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
              style={{
                width: i === current ? "28px" : "10px",
                background: i === current ? "#f97316" : "rgba(255,255,255,.5)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <div className="bg-white  border-gray-200 w-full">
        <div className="w-full px-4 md:px-8 py-2.5 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center flex-shrink-0 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4b5563"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-px h-5 bg-gray-200 flex-shrink-0" />
          {breadPath.map((crumb, i) => {
            const isLast = i === breadPath.length - 1;
            return (
              <div key={i} className="flex items-center gap-2">
                {i === 0 && (
                  <span className="text-base leading-none select-none">
                    <Home size={18} />
                  </span>
                )}
                {isLast ? (
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-400 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-xs font-semibold text-orange-600 whitespace-nowrap">
                      {crumb}
                    </span>
                  </div>
                ) : (
                  <span
                    onClick={() => setBreadPath((p) => p.slice(0, i + 1))}
                    className="text-xs font-medium text-gray-500 cursor-pointer hover:text-orange-500 transition-colors whitespace-nowrap"
                  >
                    {crumb}
                  </span>
                )}
                {!isLast && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="w-full px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-2">
            Client Reviews
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            What Our Clients Say About Us
          </h2>
          <div
            className="w-12 h-1 rounded-full mx-auto mt-3"
            style={{ background: "linear-gradient(90deg,#f97316,#fb923c)" }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 cursor-default"
              style={{
                background: t.accent.bg,
                border: `1.5px solid ${t.accent.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,.06)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,.1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.06)")
              }
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: t.accent.tag }}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill={t.accent.star}
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <span
                  className="text-xs font-semibold rounded-full px-2.5 py-1"
                  style={{ color: t.accent.tagText, background: t.accent.tag }}
                >
                  Verified ✓
                </span>
              </div>
              <Stars color={t.accent.star} />
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {t.text}
              </p>
              <div
                className="h-px my-4"
                style={{ background: t.accent.border }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow"
                  style={{
                    background: `linear-gradient(135deg,${t.accent.star},${t.accent.border})`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role} · {t.company}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="#9ca3af"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="text-xs text-gray-400">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANS — imported from ./Plans ── */}
      <Plans />

      {/* ── REQUEST A CALL BACK ── */}
      <section className="w-full px-4 md:px-8 pb-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* LEFT – image */}
            <div className="w-full md:w-2/5 relative overflow-hidden min-h-[240px]">
              <div className="absolute top-4 left-4 w-14 h-14 rounded-full border-2 border-white/70 bg-white shadow-lg flex flex-col items-center justify-center z-10">
                <span className="text-xs font-black text-gray-800 leading-tight">
                  24/7
                </span>
                <span className="text-[8px] font-bold text-gray-500 tracking-tight">
                  SERVICE
                </span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=80"
                alt="Customer support agent"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251,146,60,0.45) 0%, rgba(0,0,0,0.15) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-3 shadow">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Always Available
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Our team is here to help you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-2">
                Get In Touch
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">
                Request A Call Back
              </h3>
              <p className="text-sm text-gray-400 mb-7">
                Connect with our sales team – we'll get back to you within 24
                hours and help you grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowContact(true)}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold px-9 py-3 rounded-xl shadow-lg shadow-orange-100 transition-all hover:-translate-y-0.5 text-sm"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
}
