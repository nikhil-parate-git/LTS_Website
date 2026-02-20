import { useState, useEffect, useRef } from "react";
import { MapPin, Mic, Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layouts/navbar";
import ListBusiness from "./ListBusiness";
import TopRatedBusinesses from "./TopRatedBusinesses";

// ─── LOCATIONS ─────────────────────────────────────────────────
const locations = [
  "Delhi (Delhi NCR)", "Mumbai", "Bangalore", "Chennai",
  "Hyderabad", "Pune", "Kolkata", "Nagpur", "Ahmedabad", "Jaipur",
];

// ─── SLIDER DATA ───────────────────────────────────────────────
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=80",
    title: "India's No. 1 Local Search Engine",
    subtitle: "Hungry? Find the Best Restaurants Near You",
    cta: "EXPLORE TOP RESTAURANTS IN DELHI",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80",
    title: "India's No. 1 Local Search Engine",
    subtitle: "Need Financial Advise? Planning to invest in Mutual Funds or Insurance?",
    cta: "CONNECT WITH TOP INVESTMENT ADVISORS IN DELHI",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
    title: "India's No. 1 Local Search Engine",
    subtitle: "Looking for Quality Healthcare & Trusted Doctors?",
    cta: "FIND TOP HOSPITALS AND CLINICS IN YOUR CITY",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    title: "India's No. 1 Local Search Engine",
    subtitle: "Planning to Build Your Dream Home?",
    cta: "DISCOVER TOP ARCHITECTS AND INTERIOR DESIGNERS",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=1600&q=80",
    title: "India's No. 1 Local Search Engine",
    subtitle: "Looking for the Best Shopping Deals in Your City?",
    cta: "EXPLORE TOP SHOPPING MALLS AND STORES NEAR YOU",
  },
];

// ─── TRENDING CATEGORIES (each with 4 sub-images) ──────────────
const categories = [
  {
    id: 1,
    slug: "tours-travel",
    name: "Tours / Travel",
    subImages: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",
      "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=300&q=80",
    ],
  },
  {
    id: 2,
    slug: "massage-spa",
    name: "Massage & Spa Parlours",
    subImages: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&q=80",
      "https://images.unsplash.com/photo-1552693673-1bf958298935?w=300&q=80",
    ],
  },
  {
    id: 3,
    slug: "movers-packers",
    name: "Movers & Packers",
    subImages: [
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=300&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&q=80",
    ],
  },
  {
    id: 4,
    slug: "pest-control",
    name: "Pest Control Services",
    subImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&q=80",
      "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=300&q=80",
    ],
  },
  {
    id: 5,
    slug: "home-nurse",
    name: "Home Nurse & Domestic Help",
    subImages: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80",
    ],
  },
  {
    id: 6,
    slug: "investment-advisors",
    name: "Investment Advisors & Consultants",
    subImages: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=300&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80",
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=300&q=80",
    ],
  },
  {
    id: 7,
    slug: "lawyers",
    name: "Lawyers",
    subImages: [
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=300&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80",
      "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=300&q=80",
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=300&q=80",
    ],
  },
  {
    id: 8,
    slug: "digital-marketing",
    name: "Digital Marketing & Web Design",
    subImages: [
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=300&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=300&q=80",
    ],
  },
  {
    id: 9,
    slug: "cctv-security",
    name: "CCTV & Security System Dealers",
    subImages: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&q=80",
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=300&q=80",
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=300&q=80",
    ],
  },
  {
    id: 10,
    slug: "hotels-resorts",
    name: "Hotels & Resorts",
    subImages: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&q=80",
    ],
  },
  {
    id: 11,
    slug: "electronics-repair",
    name: "Electronics Repair Services",
    subImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80",
    ],
  },
  {
    id: 12,
    slug: "caterers",
    name: "Caterers",
    subImages: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&q=80",
    ],
  },
  {
    id: 13,
    slug: "computer-training",
    name: "Computer Training Institutes",
    subImages: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
    ],
  },
  {
    id: 14,
    slug: "hospitals-clinics",
    name: "Hospitals & Clinics",
    subImages: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?w=300&q=80",
    ],
  },
  {
    id: 15,
    slug: "legal-documents",
    name: "Legal Documents & License Agents",
    subImages: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&q=80",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&q=80",
      "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=300&q=80",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=300&q=80",
    ],
  },
];

// ─── HERO SLIDER ───────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 400);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[88vh] overflow-hidden  left-0 right-0">
      {slides.map((s, i) => (
        <div key={s.id} className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg leading-tight">
          {slide.title}
        </h1>

        {/* Search Box with Location Dropdown */}
        <div className="flex items-center bg-white rounded-xl overflow-visible shadow-2xl w-full max-w-2xl mb-8 relative">

          {/* Location Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-4 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-gray-700 font-semibold text-sm max-w-[140px] truncate">{selectedLocation}</span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-52 max-h-60 overflow-y-auto">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { setSelectedLocation(loc); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2
                      ${selectedLocation === loc ? "text-orange-500 font-semibold bg-orange-50" : "text-gray-700"}`}
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder={`Search in ${selectedLocation}`}
            className="flex-1 px-4 py-3 text-gray-700 text-sm outline-none bg-transparent placeholder-gray-400"
          />
          <button className="p-3 text-pink-500 hover:text-pink-600 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-5 py-3 rounded-r-xl">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        <h2 className="text-white text-2xl md:text-3xl font-bold mb-5 max-w-2xl leading-snug drop-shadow">
          {slide.subtitle}
        </h2>
        <button className="bg-black/60 hover:bg-black/80 border border-yellow-400 text-yellow-400 font-bold text-xs md:text-sm tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
          {slide.cta}
        </button>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-2 transition-all duration-300">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-orange-500 text-white rounded-full p-2 transition-all duration-300">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "bg-orange-500 w-7 h-3" : "bg-white/60 hover:bg-white w-3 h-3"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── CATEGORY CARD ─────────────────────────────────────────────
function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/category/${category.slug}`)}
    className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
style={{ aspectRatio: "4/3" }}
    >
      {/* Image */}
      <img
        src={category.subImages[0]}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Orange accent bar on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

      {/* Text inside image */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-sm font-bold leading-snug drop-shadow group-hover:text-orange-300 transition-colors duration-200">
          {category.name}
        </p>
        <p className="text-orange-400 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          Explore →
        </p>
      </div>
    </div>
  );
}
// ─── TRENDING CATEGORIES ───────────────────────────────────────
function TrendingCategories() {
  return (
    <section className="py-12 px-10 bg-gray-50 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 ">
            Trending Categories <span className="text-orange-500">Near You</span>
          </h2>
          {/* <button className="text-orange-500 font-semibold text-sm hover:underline">View All →</button> */}
        </div>

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 scrollbar-hide">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <HeroSlider />
      <TrendingCategories />
      <ListBusiness/>
      <TopRatedBusinesses/>
      <main></main>
    </div>
  );
}