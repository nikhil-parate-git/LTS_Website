import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home,
  Star,
  ChevronRight,
  Grid3X3,
  ArrowLeft,
  X,
  Send,
} from "lucide-react";
import Banner from "./Acbanner/Banner";
import SubmitEnquiry from "./SubmitEnquiry";
import Sidebar from "./MainSidebar"; // ← Sidebar import

// ─── ALL SUBCATEGORIES DATA ─────────────────────────────────────
const allSubCategories = {
  "ac-services": {
    name: "AC Repair & Services",
    icon: "❄️",
    color: "from-blue-500 to-cyan-400",
    items: [
      {
        id: 1,
        name: "AC Installation",
        image:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
      },
      {
        id: 2,
        name: "AC Gas Refilling",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      },
      {
        id: 3,
        name: "AC Deep Cleaning",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      },
      {
        id: 4,
        name: "AC PCB Repair",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
      },
      {
        id: 5,
        name: "Split AC Repair",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80",
      },
      {
        id: 6,
        name: "Window AC Repair",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
      {
        id: 7,
        name: "AC AMC Services",
        image:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
      },
      {
        id: 8,
        name: "Cassette AC Repair",
        image:
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80",
      },
    ],
  },
  electrician: {
    name: "Electrician",
    icon: "⚡",
    color: "from-yellow-500 to-orange-400",
    items: [
      {
        id: 1,
        name: "Switch & Socket Repair",
        image: "/Images/Switchrepair.jpg",
      },
      { id: 2, name: "Fan Installation", image: "/Images/fanInstallation.jpg" },
      {
        id: 3,
        name: "Light Installation",
        image: "/Images/lightInstallation.jpg",
      },
      {
        id: 4,
        name: "Wiring & Rewiring",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
      },
      {
        id: 5,
        name: "MCB / Fuse Repair",
        image: "/Images/MCBorFuseRepair.avif",
      },
      {
        id: 6,
        name: "Short Circuit Repair",
        image: "/Images/shortCircuitrepair.avif",
      },
      {
        id: 7,
        name: "Inverter Installation",
        image: "/Images/InverterInstallation.webp",
      },
      {
        id: 8,
        name: "Water Motor Repair",
        image: "/Images/waterMotorrepair.avif",
      },
    ],
  },
  plumber: {
    name: "Plumber",
    icon: "🔧",
    color: "from-blue-600 to-blue-400",
    items: [
      {
        id: 1,
        name: "Pipe Leakage Repair",
        image:
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80",
      },
      {
        id: 2,
        name: "Bathroom Fitting",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
      },
      {
        id: 3,
        name: "Water Tank Cleaning",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      },
      {
        id: 4,
        name: "Tap & Mixer Repair",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
      {
        id: 5,
        name: "Drainage & Sewage Cleaning",
        image:
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80",
      },
      {
        id: 6,
        name: "Geyser Installation & Repair",
        image:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
      },
      {
        id: 7,
        name: "Kitchen Plumbing",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      },
      {
        id: 8,
        name: "Overhead Tank Installation",
        image:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80",
      },
    ],
  },
  carpenter: {
    name: "Carpenter",
    icon: "🪚",
    color: "from-amber-600 to-yellow-500",
    items: [
      {
        id: 1,
        name: "Furniture Making",
        image:
          "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
      },
      {
        id: 2,
        name: "Modular Kitchen",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
      },
      {
        id: 3,
        name: "Door & Window Repair",
        image:
          "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
      },
      {
        id: 4,
        name: "Wardrobe Installation",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
      },
      {
        id: 5,
        name: "False Ceiling Work",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      },
      {
        id: 6,
        name: "Wooden Flooring",
        image:
          "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80",
      },
      {
        id: 7,
        name: "Sofa & Chair Repair",
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80",
      },
      {
        id: 8,
        name: "Bed & Cot Making",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
      },
    ],
  },
  "gym-fitness": {
    name: "Gym & Fitness Centers",
    icon: "💪",
    color: "from-red-500 to-orange-500",
    items: [
      {
        id: 1,
        name: "Weight Training Gyms",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
      },
      {
        id: 2,
        name: "CrossFit Centers",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
      },
      {
        id: 3,
        name: "Yoga Centers",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
      },
      {
        id: 4,
        name: "Zumba & Dance Fitness",
        image:
          "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&q=80",
      },
      {
        id: 5,
        name: "Swimming Pools",
        image:
          "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=400&q=80",
      },
      {
        id: 6,
        name: "Personal Trainers",
        image:
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
      },
      {
        id: 7,
        name: "Aerobics Classes",
        image:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
      },
      {
        id: 8,
        name: "Martial Arts Centers",
        image:
          "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80",
      },
    ],
  },
  "tours-travel": {
    name: "Tours / Travel",
    icon: "✈️",
    color: "from-sky-500 to-blue-400",
    items: [
      {
        id: 1,
        name: "Air Ticketing Agents Domestic",
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80",
      },
      {
        id: 2,
        name: "Domestic Tour Operators",
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
      },
      {
        id: 3,
        name: "Domestic Travel Agents",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
      },
      {
        id: 4,
        name: "International Tour Operators",
        image:
          "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=80",
      },
      {
        id: 5,
        name: "International Tour Package Dealers",
        image:
          "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80",
      },
      {
        id: 6,
        name: "Mini Bus on Hire",
        image:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80",
      },
      {
        id: 7,
        name: "Travel Passport Consultants",
        image:
          "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=80",
      },
      {
        id: 8,
        name: "Tour Operators",
        image:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
      },
      {
        id: 9,
        name: "Radio Taxi",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
      {
        id: 10,
        name: "Taxi Services For City",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
      },
      {
        id: 11,
        name: "Taxi Services Inter City",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
      },
      {
        id: 12,
        name: "24/7 Taxi Services",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80",
      },
    ],
  },
  "massage-spa": {
    name: "Massage & Spa Parlours",
    icon: "💆",
    color: "from-rose-400 to-pink-400",
    items: [
      {
        id: 1,
        name: "Body Massage Centers",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
      },
      {
        id: 2,
        name: "Aromatherapy Spas",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
      },
      {
        id: 3,
        name: "Thai Massage",
        image:
          "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80",
      },
      {
        id: 4,
        name: "Foot Massage Parlours",
        image:
          "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
      },
      {
        id: 5,
        name: "Ayurvedic Massage Centers",
        image:
          "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80",
      },
      {
        id: 6,
        name: "Luxury Spa & Wellness",
        image:
          "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80",
      },
    ],
  },
  "movers-packers": {
    name: "Movers & Packers",
    icon: "📦",
    color: "from-orange-500 to-amber-400",
    items: [
      {
        id: 1,
        name: "Home Shifting Services",
        image:
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80",
      },
      {
        id: 2,
        name: "Office Relocation",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
      {
        id: 3,
        name: "Vehicle Transport",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80",
      },
      {
        id: 4,
        name: "Warehouse & Storage",
        image:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80",
      },
      {
        id: 5,
        name: "International Movers",
        image:
          "https://images.unsplash.com/photo-1543168256-418811576931?w=400&q=80",
      },
      {
        id: 6,
        name: "Furniture Packers",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
      },
    ],
  },
  "hospitals-clinics": {
    name: "Hospitals & Clinics",
    icon: "🏥",
    color: "from-green-500 to-emerald-400",
    items: [
      {
        id: 1,
        name: "Multi Specialty Hospitals",
        image:
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=80",
      },
      {
        id: 2,
        name: "Dental Clinics",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
      },
      {
        id: 3,
        name: "Eye Care Centers",
        image:
          "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80",
      },
      {
        id: 4,
        name: "Diagnostic Labs",
        image:
          "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80",
      },
      {
        id: 5,
        name: "Pediatric Clinics",
        image:
          "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80",
      },
      {
        id: 6,
        name: "Orthopedic Centers",
        image:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
      },
    ],
  },
  lawyers: {
    name: "Lawyers",
    icon: "⚖️",
    color: "from-slate-600 to-slate-500",
    items: [
      {
        id: 1,
        name: "Criminal Lawyers",
        image:
          "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&q=80",
      },
      {
        id: 2,
        name: "Civil Lawyers",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
      },
      {
        id: 3,
        name: "Family Lawyers",
        image:
          "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400&q=80",
      },
      {
        id: 4,
        name: "Corporate Lawyers",
        image:
          "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80",
      },
      {
        id: 5,
        name: "Property Lawyers",
        image:
          "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&q=80",
      },
      {
        id: 6,
        name: "Tax Lawyers",
        image:
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&q=80",
      },
    ],
  },
};

// ─── STAR RATING ───────────────────────────────────────────────
function StarRating({ rating = 3.6 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={
            star <= Math.floor(rating)
              ? "#f97316"
              : star - 0.5 <= rating
                ? "#fed7aa"
                : "none"
          }
          stroke="#f97316"
          strokeWidth={1.5}
        />
      ))}
      <span className="text-xs font-semibold text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

// ─── SUBCATEGORY CARD ──────────────────────────────────────────
function SubCategoryCard({ item, onCardClick, index }) {
  return (
    <div
      onClick={() => onCardClick(item)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-orange-300 cursor-pointer transition-all duration-300 hover:-translate-y-2"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className="w-full overflow-hidden relative bg-gray-100"
        style={{ aspectRatio: "3/2" }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80";
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            View
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-bold leading-tight drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.name}
          </p>
        </div>
        <div className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
          <ChevronRight size={15} className="text-orange-500" />
        </div>
      </div>
      <div className="px-4 py-4 border-t border-gray-50 bg-white">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 leading-snug transition-colors duration-200 text-center">
          {item.name}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-1 h-1 rounded-full bg-orange-400" />
          <span className="text-[10px] text-orange-400 font-medium">
            Tap to explore
          </span>
          <div className="w-1 h-1 rounded-full bg-orange-400" />
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE SIDEBAR DRAWER ─────────────────────────────────────
function MobileSidebarDrawer({ open, onClose, cityName }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-gray-50 z-50 overflow-y-auto shadow-2xl"
        style={{ animation: "slideIn 0.25s ease-out" }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between z-10">
          <span className="font-bold text-gray-800 text-sm">Quick Connect</span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-4">
          <Sidebar cityName={cityName} />
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

// ─── SUBCATEGORY PAGE ──────────────────────────────────────────
export default function SubCategory() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = allSubCategories[slug] || {
    name: "Category",
    items: [],
    icon: "📋",
    color: "from-gray-500 to-gray-400",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebarDrawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        cityName="Delhi"
      />

      {/* ── Breadcrumb / Header ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Back + Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-500 hover:border-orange-500 transition-all duration-200 flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft
                size={15}
                className="text-orange-500 group-hover:text-white transition-colors duration-200"
              />
            </button>
            <ChevronRight
              size={14}
              className="text-gray-300 hidden sm:block flex-shrink-0"
            />
            <button
              onClick={() => navigate("/")}
              className="flex cursor-pointer items-center gap-1.5 text-base font-medium text-gray-500 hover:text-orange-500 transition-colors duration-200 hidden sm:flex"
            >
              <Home size={13} />
              <span>Home</span>
            </button>
            <ChevronRight
              size={14}
              className="text-gray-300 hidden sm:block flex-shrink-0"
            />
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm">{data.icon}</span>
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm shadow-orange-200 truncate max-w-[140px] sm:max-w-none">
                {data.name}
              </span>
            </div>
          </div>

          {/* Right: stats + star + mobile connect btn */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <Grid3X3 size={12} className="text-gray-400" />
              <span className="font-semibold text-gray-700">
                {data.items.length}
              </span>{" "}
              services
            </span>
            <StarRating rating={3.6} />
            {/* Mobile: Connect button to open sidebar drawer */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-3 py-1.5 font-bold transition-colors"
            >
              <Send size={12} /> Connect
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* ── Grid ── */}
          <div className="flex-1 min-w-0">
            {data.items.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                      {data.items.length}
                    </span>{" "}
                    services in{" "}
                    <span className="text-orange-500 font-semibold">
                      {data.name}
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Live listings</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {data.items.map((item, index) => (
                    <SubCategoryCard
                      key={item.id}
                      item={item}
                      onCardClick={() => navigate(`/category/${slug}`)}
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-4 border border-orange-100">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  No services found
                </h3>
                <p className="text-sm text-gray-400 max-w-xs">
                  We couldn't find any subcategories for this section.
                </p>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
                >
                  ← Go Back
                </button>
              </div>
            )}
          </div>

          {/* ── Desktop Sidebar ── */}
          <div className="hidden lg:block w-72 shrink-0">
            <Sidebar cityName="Delhi" />
          </div>
        </div>
      </div>

      {/* Modal — imported SubmitEnquiry, auto opens on load */}
      {showModal && <SubmitEnquiry onClose={() => setShowModal(false)} />}
    </div>
  );
}
