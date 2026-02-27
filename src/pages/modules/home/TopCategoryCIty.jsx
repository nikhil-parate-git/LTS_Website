import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1,  slug: "daily-home-needs",         name: "Daily Home Needs",                emoji: "🏠" },
  { id: 2,  slug: "business-office",           name: "Business Needs & Office Supplies", emoji: "💼" },
  { id: 3,  slug: "repairs-service",           name: "Repairs & Service",               emoji: "🔧" },
  { id: 4,  slug: "brokers-agents",            name: "Brokers, Agents & Agencies",      emoji: "🤝" },
  { id: 5,  slug: "consultants",               name: "Consultants & Professionals",     emoji: "👨‍💼" },
  { id: 6,  slug: "advertising-marketing",     name: "Advertising & Marketing",         emoji: "📢" },
  { id: 7,  slug: "doctors-hospitals",         name: "Doctors, Clinics & Hospitals",    emoji: "🩺" },
  { id: 8,  slug: "kids-children",             name: "Kids & Children",                 emoji: "🧒" },
  { id: 9,  slug: "fun-entertainment",         name: "Fun & Entertainment",             emoji: "🎡" },
  { id: 10, slug: "party-events-weddings",     name: "Party, Events & Weddings",        emoji: "💍" },
  { id: 11, slug: "restaurants-food",          name: "Restaurants, Food & Drinks",      emoji: "🍽️" },
  { id: 12, slug: "salon-beauty-spa",          name: "Salon, Beauty & Spa",             emoji: "💇" },
  { id: 13, slug: "contractors",               name: "Contractors",                     emoji: "👷" },
  { id: 14, slug: "furniture",                 name: "Furniture",                       emoji: "🛋️" },
  { id: 15, slug: "electricals-lights",        name: "Electricals & Lights",            emoji: "💡" },
  { id: 16, slug: "flooring-walls-roofing",    name: "Flooring, Walls & Roofing",       emoji: "🧱" },
  { id: 17, slug: "architecture-interiors",    name: "Architecture & Interiors",        emoji: "📐" },
  { id: 18, slug: "plywood-hardware-paint",    name: "Plywood, Hardware & Paint",       emoji: "🪣" },
  { id: 19, slug: "sanitary-bath",             name: "Sanitary & Bath Fittings",        emoji: "🚿" },
  { id: 20, slug: "travel-tourism",            name: "Travel & Tourism",                emoji: "✈️" },
  { id: 21, slug: "hotels-accommodation",      name: "Hotels & Accommodation",          emoji: "🏨" },
  { id: 22, slug: "hobby-classes",             name: "Hobby Classes",                   emoji: "🎨" },
  { id: 23, slug: "education-coaching",        name: "Education, Coaching & Training",  emoji: "🎓" },
  { id: 24, slug: "gifting",                   name: "Gifting",                         emoji: "🎁" },
  { id: 25, slug: "health-fitness-sports",     name: "Health, Fitness & Sports",        emoji: "🏋️" },
  { id: 26, slug: "home-kitchen",              name: "Home & Kitchen",                  emoji: "🍳" },
  { id: 27, slug: "clothing-fashion",          name: "Clothing & Fashion",              emoji: "👗" },
  { id: 28, slug: "jewellery",                 name: "Jewellery",                       emoji: "💍" },
  { id: 29, slug: "cars-bikes-automobiles",    name: "Cars, Bikes & Automobiles",       emoji: "🚗" },
  { id: 30, slug: "courier-transport",         name: "Courier, Transport & Logistics",  emoji: "🚚" },
  { id: 31, slug: "real-estate",               name: "Real Estate",                     emoji: "🏢" },
  { id: 32, slug: "financial-services",        name: "Financial Services",              emoji: "💰" },
  { id: 33, slug: "it-services",               name: "IT Services",                     emoji: "💻" },
  { id: 34, slug: "laptops-mobiles",           name: "Laptops, Mobiles & Computers",    emoji: "📱" },
  { id: 35, slug: "electronics-appliances",    name: "Electronics & Appliances",        emoji: "📺" },
  { id: 36, slug: "printing-display-signage",  name: "Printing, Display & Signage",     emoji: "🖨️" },
  { id: 37, slug: "security-surveillance",     name: "Security & Surveillance",         emoji: "📷" },
  { id: 38, slug: "machines-tools",            name: "Machines, Tools & Equipments",    emoji: "⚙️" },
  { id: 39, slug: "farming-plants-pets",       name: "Farming, Plants, Flowers & Pets", emoji: "🌿" },
];

const INITIAL_ROWS = 3;
const COLS = 8;
const INITIAL_SHOW = INITIAL_ROWS * COLS; // 24

function CategoryTile({ cat, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/subcategory/${cat.slug}`)}
      className="flex flex-col items-center gap-2 cursor-pointer group"
      style={{
        animation: `fadeUp 0.35s ease both`,
        animationDelay: `${(index % INITIAL_SHOW) * 0.025}s`,
      }}
    >
      {/* Icon box */}
      <div
        className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-2xl border flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 select-none"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered
            ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
            : "#fff",
          boxShadow: hovered
            ? "0 8px 24px rgba(249,115,22,0.18)"
            : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        }}
      >
        {cat.emoji}
      </div>

      {/* Name */}
      <p
        className="text-center text-[11px] md:text-xs font-semibold leading-tight max-w-[88px] transition-colors duration-200"
        style={{ color: hovered ? "#f97316" : "#374151" }}
      >
        {cat.name}
      </p>
    </div>
  );
}

function ViewMoreTile({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-2xl border flex items-center justify-center text-3xl transition-all duration-300"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered ? "linear-gradient(135deg, #fff7ed, #ffedd5)" : "#fff",
          boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.18)" : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        }}
      >
        <div className="grid grid-cols-3 gap-[3px]">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-[6px] h-[6px] rounded-sm transition-colors duration-200"
              style={{ background: hovered ? "#f97316" : "#6b7280" }}
            />
          ))}
        </div>
      </div>
      <p
        className="text-center text-[11px] md:text-xs font-semibold leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#f97316" : "#374151" }}
      >
        View More<br />Categories
      </p>
    </div>
  );
}

export default function TopCategoryCity({ city = "Nagpur" }) {
  const [showAll, setShowAll] = useState(false);

  const visibleCats = showAll ? categories : categories.slice(0, INITIAL_SHOW - 1);

  return (
    <section className="py-12 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top Categories in{" "}
            <span className="text-orange-500">{city}</span>
          </h2>
          <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-orange-500" />
        </div>

        {/* Grid */}
        <div
          className="grid gap-x-4 gap-y-7"
          style={{
            gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
          }}
        >
          {visibleCats.map((cat, i) => (
            <CategoryTile key={cat.id} cat={cat} index={i} />
          ))}

          {/* View More / View Less tile in last slot */}
          {!showAll ? (
            <ViewMoreTile onClick={() => setShowAll(true)} />
          ) : (
            <div
              onClick={() => setShowAll(false)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-2xl border border-gray-200 hover:border-orange-400 flex items-center justify-center text-2xl transition-all duration-300 hover:bg-orange-50 hover:shadow-lg hover:-translate-y-1">
                ↑
              </div>
              <p className="text-center text-[11px] md:text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                Show Less
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition-all duration-300"
          >
            {showAll ? "← Show Less" : "View All Categories →"}
          </button>
        </div>
      </div>

      {/* Responsive: 4 cols on mobile */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 480px) {
          .grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}