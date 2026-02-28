import { useState } from "react";
import {
  BadgeCheck,
  ThumbsUp,
  Wallet,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    id: 1,
    Icon: BadgeCheck,
    bgColor: "#EFF6FF",
    iconColor: "#3b82f6",
    borderColor: "#93c5fd",
    title: "Verified & Trusted Businesses",
    desc: "Every business listed on LocalTradeStreet goes through a strict verification process. We authenticate each listing so you always connect with genuine, reliable local businesses — no frauds, no fakes.",
  },
  {
    id: 2,
    Icon: ThumbsUp,
    bgColor: "#F0FDF4",
    iconColor: "#22c55e",
    borderColor: "#86efac",
    title: "100% Satisfaction Guarantee",
    desc: "Your peace of mind is our priority. Real reviews, honest ratings, and post-service support ensure your experience exceeds expectations every single time.",
  },
  {
    id: 3,
    Icon: Wallet,
    bgColor: "#FEFCE8",
    iconColor: "#eab308",
    borderColor: "#fde047",
    title: "Transparent & Free to Use",
    desc: "LocalTradeStreet is completely free for consumers. No hidden fees, no commissions, no paywalls. Get access to thousands of top-rated local businesses at zero cost.",
  },
  {
    id: 4,
    Icon: MapPin,
    bgColor: "#FFF7ED",
    iconColor: "#f97316",
    borderColor: "#fdba74",
    title: "Hyperlocal Search Precision",
    desc: "Our hyperlocal engine surfaces the most relevant businesses in your exact neighbourhood — not just your city — so you find what you need, right where you are.",
  },
  {
    id: 5,
    Icon: Phone,
    bgColor: "#FDF4FF",
    iconColor: "#a855f7",
    borderColor: "#d8b4fe",
    title: "Direct Business Connect",
    desc: "No middlemen, no bots. LocalTradeStreet connects you directly with business owners. Call, WhatsApp, or enquire instantly — and get a real human response within minutes.",
  },
  {
    id: 6,
    Icon: ShieldCheck,
    bgColor: "#F0FDFA",
    iconColor: "#14b8a6",
    borderColor: "#5eead4",
    title: "Safe & Secure Platform",
    desc: "Your data is yours. We never sell your information to third parties. Our platform is built with enterprise-grade security so you can browse and connect with complete confidence.",
  },
];

function ReasonCard({ reason, index }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = reason;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="why-card rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: reason.bgColor,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        animation: "fadeUp 0.4s ease both",
        animationDelay: `${index * 0.08}s`,
        border: hovered
          ? `1.5px solid ${reason.borderColor}`
          : "1.5px solid transparent",
      }}
    >
      <div
        className="icon-wrap rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
        style={{
          background: `${reason.iconColor}18`,
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
        }}
      >
        <Icon strokeWidth={1.8} style={{ color: reason.iconColor }} className="why-icon" />
      </div>

      <h3
        className="why-card-title font-bold mb-2 transition-colors duration-200"
        style={{ color: hovered ? reason.iconColor : "#111827" }}
      >
        {reason.title}
      </h3>

      <p className="why-card-desc text-gray-500 leading-relaxed">{reason.desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-12 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="why-title font-extrabold text-gray-900 leading-tight">
            Why Choose <span className="text-orange-500">LocalTradeStreet</span>
            <br className="hidden md:block" /> for Your Local Business Needs?
          </h2>
          <p className="why-subtitle text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
            India's most trusted local search platform — connecting millions of customers with verified businesses across 500+ cities.
          </p>
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <div className="h-1 w-8 rounded-full bg-orange-200" />
            <div className="h-1 w-16 rounded-full bg-orange-500" />
            <div className="h-1 w-8 rounded-full bg-orange-200" />
          </div>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <ReasonCard key={r.id} reason={r} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Desktop (>1024px): 3 columns */
        .why-title       { font-size: 2rem; }
        .why-subtitle    { font-size: 0.95rem; }
        .why-grid        { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .why-card        { padding: 28px; }
        .icon-wrap       { width: 54px; height: 54px; }
        .why-icon        { width: 26px; height: 26px; }
        .why-card-title  { font-size: 1rem; }
        .why-card-desc   { font-size: 0.875rem; }

        /* Tablet (<=1024px): 2 columns */
        @media (max-width: 1024px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .why-card { padding: 24px; }
        }

        /* Small Tablet (<=768px): 2 columns, compact */
        @media (max-width: 768px) {
          .why-title      { font-size: 1.6rem; }
          .why-subtitle   { font-size: 0.875rem; }
          .why-grid       { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .why-card       { padding: 20px; }
          .icon-wrap      { width: 46px; height: 46px; }
          .why-icon       { width: 22px; height: 22px; }
          .why-card-title { font-size: 0.9rem; }
          .why-card-desc  { font-size: 0.8rem; }
        }

        /* Mobile (<=480px): 1 column */
        @media (max-width: 480px) {
          .why-title { font-size: 1.4rem; }
          .why-grid  { grid-template-columns: 1fr; gap: 14px; }
          .why-card  { padding: 18px; }
          .icon-wrap { width: 44px; height: 44px; }
          .why-icon  { width: 20px; height: 20px; }
        }

        /* Small Mobile (<=360px) */
        @media (max-width: 360px) {
          .why-title      { font-size: 1.25rem; }
          .why-card       { padding: 16px; }
          .icon-wrap      { width: 40px; height: 40px; }
          .why-icon       { width: 18px; height: 18px; }
          .why-card-title { font-size: 0.85rem; }
        }
      `}</style>
    </section>
  );
}