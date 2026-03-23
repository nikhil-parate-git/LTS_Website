import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  Wrench,
  Users,
  UserCircle,
  Megaphone,
  Stethoscope,
  Baby,
  Ticket,
  PartyPopper,
  UtensilsCrossed,
  Scissors,
  HardHat,
  Sofa,
  Lightbulb,
  Layers,
  Ruler,
  Hammer,
  Bath,
  Plane,
  Hotel,
  Palette,
  GraduationCap,
  Gift,
  Dumbbell,
  ChefHat,
  ShoppingBag,
  Gem,
  Car,
  Truck,
  Building2,
  Landmark,
  Monitor,
  Smartphone,
  Tv,
  Printer,
  Camera,
  Settings2,
  Leaf,
  Grid3X3,
  ChevronUp,
} from "lucide-react";
import { useSelector } from "react-redux";

const categories = [
  { id: 1, slug: "daily-home-needs", name: "Daily Home Needs", Icon: Home },
  {
    id: 2,
    slug: "business-office",
    name: "Business Needs & Office Supplies",
    Icon: Briefcase,
  },
  { id: 3, slug: "repairs-service", name: "Repairs & Service", Icon: Wrench },
  {
    id: 4,
    slug: "brokers-agents",
    name: "Brokers, Agents & Agencies",
    Icon: Users,
  },
  {
    id: 5,
    slug: "consultants",
    name: "Consultants & Professionals",
    Icon: UserCircle,
  },
  {
    id: 6,
    slug: "advertising-marketing",
    name: "Advertising & Marketing",
    Icon: Megaphone,
  },
  {
    id: 7,
    slug: "doctors-hospitals",
    name: "Doctors, Clinics & Hospitals",
    Icon: Stethoscope,
  },
  { id: 8, slug: "kids-children", name: "Kids & Children", Icon: Baby },
  {
    id: 9,
    slug: "fun-entertainment",
    name: "Fun & Entertainment",
    Icon: Ticket,
  },
  {
    id: 10,
    slug: "party-events-weddings",
    name: "Party, Events & Weddings",
    Icon: PartyPopper,
  },
  {
    id: 11,
    slug: "restaurants-food",
    name: "Restaurants, Food & Drinks",
    Icon: UtensilsCrossed,
  },
  {
    id: 12,
    slug: "salon-beauty-spa",
    name: "Salon, Beauty & Spa",
    Icon: Scissors,
  },
  { id: 13, slug: "contractors", name: "Contractors", Icon: HardHat },
  { id: 14, slug: "furniture", name: "Furniture", Icon: Sofa },
  {
    id: 15,
    slug: "electricals-lights",
    name: "Electricals & Lights",
    Icon: Lightbulb,
  },
  {
    id: 16,
    slug: "flooring-walls-roofing",
    name: "Flooring, Walls & Roofing",
    Icon: Layers,
  },
  {
    id: 17,
    slug: "architecture-interiors",
    name: "Architecture & Interiors",
    Icon: Ruler,
  },
  {
    id: 18,
    slug: "plywood-hardware-paint",
    name: "Plywood, Hardware & Paint",
    Icon: Hammer,
  },
  {
    id: 19,
    slug: "sanitary-bath",
    name: "Sanitary & Bath Fittings",
    Icon: Bath,
  },
  { id: 20, slug: "travel-tourism", name: "Travel & Tourism", Icon: Plane },
  {
    id: 21,
    slug: "hotels-accommodation",
    name: "Hotels & Accommodation",
    Icon: Hotel,
  },
  { id: 22, slug: "hobby-classes", name: "Hobby Classes", Icon: Palette },
  {
    id: 23,
    slug: "education-coaching",
    name: "Education, Coaching & Training",
    Icon: GraduationCap,
  },
  { id: 24, slug: "gifting", name: "Gifting", Icon: Gift },
  {
    id: 25,
    slug: "health-fitness-sports",
    name: "Health, Fitness & Sports",
    Icon: Dumbbell,
  },
  { id: 26, slug: "home-kitchen", name: "Home & Kitchen", Icon: ChefHat },
  {
    id: 27,
    slug: "clothing-fashion",
    name: "Clothing & Fashion",
    Icon: ShoppingBag,
  },
  { id: 28, slug: "jewellery", name: "Jewellery", Icon: Gem },
  {
    id: 29,
    slug: "cars-bikes-automobiles",
    name: "Cars, Bikes & Automobiles",
    Icon: Car,
  },
  {
    id: 30,
    slug: "courier-transport",
    name: "Courier, Transport & Logistics",
    Icon: Truck,
  },
  { id: 31, slug: "real-estate", name: "Real Estate", Icon: Building2 },
  {
    id: 32,
    slug: "financial-services",
    name: "Financial Services",
    Icon: Landmark,
  },
  { id: 33, slug: "it-services", name: "IT Services", Icon: Monitor },
  {
    id: 34,
    slug: "laptops-mobiles",
    name: "Laptops, Mobiles & Computers",
    Icon: Smartphone,
  },
  {
    id: 35,
    slug: "electronics-appliances",
    name: "Electronics & Appliances",
    Icon: Tv,
  },
  {
    id: 36,
    slug: "printing-display-signage",
    name: "Printing, Display & Signage",
    Icon: Printer,
  },
  {
    id: 37,
    slug: "security-surveillance",
    name: "Security & Surveillance",
    Icon: Camera,
  },
  {
    id: 38,
    slug: "machines-tools",
    name: "Machines, Tools & Equipments",
    Icon: Settings2,
  },
  {
    id: 39,
    slug: "farming-plants-pets",
    name: "Farming, Plants, Flowers & Pets",
    Icon: Leaf,
  },
];

const INITIAL_SHOW = 23;

function CategoryTile({ cat, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const { Icon } = cat;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/top-category/${cat.slug}`)} // ✅ FIXED
      className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
      style={{
        animation: `fadeUp 0.35s ease both`,
        animationDelay: `${(index % INITIAL_SHOW) * 0.025}s`,
      }}
    >
      <div
        className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300 select-none"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered
            ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
            : "#fff",
          boxShadow: hovered
            ? "0 8px 24px rgba(249,115,22,0.18)"
            : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered
            ? "translateY(-4px) scale(1.07)"
            : "translateY(0) scale(1)",
        }}
      >
        <Icon
          className="cat-icon"
          strokeWidth={1.6}
          style={{
            color: hovered ? "#f97316" : "#6b7280",
            transition: "color 0.2s ease",
          }}
        />
      </div>
      <p
        className="cat-name text-center font-semibold leading-tight transition-colors duration-200"
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
      className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered
            ? "linear-gradient(135deg, #fff7ed, #ffedd5)"
            : "#fff",
          boxShadow: hovered
            ? "0 8px 24px rgba(249,115,22,0.18)"
            : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered
            ? "translateY(-4px) scale(1.07)"
            : "translateY(0) scale(1)",
        }}
      >
        <Grid3X3
          className="cat-icon"
          strokeWidth={1.6}
          style={{
            color: hovered ? "#f97316" : "#6b7280",
            transition: "color 0.2s ease",
          }}
        />
      </div>
      <p
        className="cat-name text-center font-semibold leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#f97316" : "#374151" }}
      >
        View More
        <br />
        Categories
      </p>
    </div>
  );
}

function ViewLessTile({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered
            ? "linear-gradient(135deg, #fff7ed, #ffedd5)"
            : "#fff",
          boxShadow: hovered
            ? "0 8px 24px rgba(249,115,22,0.18)"
            : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered
            ? "translateY(-4px) scale(1.07)"
            : "translateY(0) scale(1)",
        }}
      >
        <ChevronUp
          className="cat-icon"
          strokeWidth={1.6}
          style={{
            color: hovered ? "#f97316" : "#6b7280",
            transition: "color 0.2s ease",
          }}
        />
      </div>
      <p
        className="cat-name text-center font-semibold leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#f97316" : "#374151" }}
      >
        Show Less
      </p>
    </div>
  );
}

export default function TopCategoryCity({ city = "Nagpur" }) {
  const [showAll, setShowAll] = useState(false);
  const { selectedCity } = useSelector((state) => state.location);
  const visibleCats = showAll ? categories : categories.slice(0, INITIAL_SHOW);

  return (
    <section
      className="py-10 px-4 bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top Categories in <span className="text-orange-500">{selectedCity}</span>
          </h2>
          <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-orange-500" />
        </div>

        <div className="cat-grid">
          {visibleCats.map((cat, i) => (
            <CategoryTile key={cat.id} cat={cat} index={i} />
          ))}
          {!showAll ? (
            <ViewMoreTile onClick={() => setShowAll(true)} />
          ) : (
            <ViewLessTile onClick={() => setShowAll(false)} />
          )}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition-all duration-300"
          >
            {showAll ? "← Show Less" : "View All Categories →"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 20px 8px;
        }
        .icon-box  { width: 80px; height: 80px; }
        .cat-icon  { width: 28px; height: 28px; }
        .cat-name  { font-size: 11px; max-width: 88px; }
        @media (max-width: 1024px) {
          .cat-grid  { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 18px 8px; }
          .icon-box  { width: 74px; height: 74px; }
        }
        @media (max-width: 768px) {
          .cat-grid  { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px 6px; }
          .icon-box  { width: 64px; height: 64px; }
          .cat-icon  { width: 24px; height: 24px; }
          .cat-name  { font-size: 10px; max-width: 72px; }
        }
        @media (max-width: 540px) {
          .cat-grid  { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px 6px; }
          .icon-box  { width: 58px; height: 58px; }
          .cat-icon  { width: 22px; height: 22px; }
          .cat-name  { font-size: 9.5px; max-width: 64px; }
        }
        @media (max-width: 360px) {
          .cat-grid  { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px 4px; }
          .icon-box  { width: 54px; height: 54px; }
          .cat-icon  { width: 20px; height: 20px; }
          .cat-name  { font-size: 9px; max-width: 60px; }
        }
      `}</style>
    </section>
  );
}
