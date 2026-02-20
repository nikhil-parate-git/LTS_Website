import { useState } from "react";

const reasons = [
  {
    id: 1,
    icon: "🏆",
    bgColor: "#EFF6FF",
    iconBg: "#DBEAFE",
    title: "Verified & Trusted Businesses",
    desc: "Every business listed on LocalTradeStreet goes through a strict verification process. We background-check and authenticate each listing so you always connect with genuine, reliable local businesses — no frauds, no fakes.",
  },
  {
    id: 2,
    icon: "⭐",
    bgColor: "#F0FDF4",
    iconBg: "#DCFCE7",
    title: "100% Satisfaction Guarantee",
    desc: "Your peace of mind is our priority. We don't just list businesses — we curate the best. Real reviews, honest ratings, and post-service support ensure your experience exceeds expectations every single time.",
  },
  {
    id: 3,
    icon: "💰",
    bgColor: "#FEFCE8",
    iconBg: "#FEF9C3",
    title: "Transparent & Free to Use",
    desc: "Quality shouldn't cost a fortune. LocalTradeStreet is completely free for consumers. No hidden fees, no commissions, no paywalls. Get access to thousands of top-rated local businesses at zero cost.",
  },
  {
    id: 4,
    icon: "📍",
    bgColor: "#FFF7ED",
    iconBg: "#FFEDD5",
    title: "Hyperlocal Search Precision",
    desc: "We understand India's diverse local markets. Our hyperlocal engine surfaces the most relevant businesses in your exact neighbourhood — not just your city — so you find what you need, right where you are.",
  },
  {
    id: 5,
    icon: "🤝",
    bgColor: "#FDF4FF",
    iconBg: "#F3E8FF",
    title: "Direct Business Connect",
    desc: "No middlemen, no bots. LocalTradeStreet connects you directly with business owners. Call, WhatsApp, or enquire instantly — and get a real human response within minutes.",
  },
  {
    id: 6,
    icon: "🛡️",
    bgColor: "#F0FDFA",
    iconBg: "#CCFBF1",
    title: "Safe & Secure Platform",
    desc: "Your data is yours. We never sell your information to third parties. Our platform is built with enterprise-grade security so you can browse, search, and connect with complete confidence.",
  },
];

function ReasonCard({ reason, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 transition-all duration-350 cursor-default"
      style={{
        background: reason.bgColor,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 0.08}s`,
        border: hovered ? "1.5px solid #f97316" : "1.5px solid transparent",
      }}
    >
      {/* Icon box */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300"
        style={{
          background: reason.iconBg,
          transform: hovered ? "scale(1.15) rotate(-4deg)" : "scale(1) rotate(0deg)",
        }}
      >
        {reason.icon}
      </div>

      <h3
        className="font-bold text-gray-900 text-base mb-2 transition-colors duration-200"
        style={{ color: hovered ? "#ea580c" : "#111827" }}
      >
        {reason.title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed">
        {reason.desc}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-9 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          {/* <span className="inline-block bg-orange-50 text-orange-500 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-orange-200 mb-4">
            Why Us
          </span> */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Why Choose{" "}
            <span className="text-orange-500">LocalTradeStreet</span>
            <br className="hidden md:block" /> for Your Local Business Needs?
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            India's most trusted local search platform — connecting millions of customers with verified businesses across 500+ cities.
          </p>
        
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <div className="h-1 w-8 rounded-full bg-orange-200" />
            <div className="h-1 w-16 rounded-full bg-orange-500" />
            <div className="h-1 w-8 rounded-full bg-orange-200" />
          </div>
        </div>

        {/* Cards grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      `}</style>
    </section>
  );
}