import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingCart,
  Apple,
  Pill,
  Scissors,
  Cake,
  MapPin,
  Search,
  ChevronRight,
  Home,
  ArrowLeft,
} from "lucide-react";

const allCategories = {
  "daily-home-needs": {
    label: "Daily Home Needs",
    sections: [
      {
        id: 1,
        title: "Grocery & General Stores",
        icon: <ShoppingCart size={18} className="text-orange-500" />,
        color: "bg-orange-50 border-orange-200",
        headerColor: "text-orange-600",
        items: [
          "Grocery shops & Departmental Stores",
          "Grocery shops & Departmental Stores",
          "Grocery shops & Departmental Stores",
          "Grocery shops & Departmental Stores",
          "Grocery shops & Departmental Stores",
          "Grocery shops & Departmental Stores",
          "Dry Fruits Dealer",
          "Tailors Or Stitching Units",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Food Production Retailer",
          "Automobile Retailer Dealers",
          "Atta Chakki Machine Dealers",
          "Atta Chakki Machine Dealers",
          "Atta Chakki Machine Dealers",
          "Baby Food Retailers",
          "Baby Food Retailers",
          "Idli Butter Retailers",
          "Idli Butter Retailers",
          "Idli Butter Retailers",
        ],
      },
      {
        id: 2,
        title: "Fruits & Vegetable Shop",
        icon: <Apple size={18} className="text-green-500" />,
        color: "bg-green-50 border-green-200",
        headerColor: "text-green-600",
        items: [
          "Fruits And Vegetables Home Delivery",
          "Vegetable Vendors",
          "Edible Oil Dealers",
          "Fruits And Vegetables Home Delivery",
          "Fruits Vendors",
          "Fruits Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
        ],
      },
      {
        id: 3,
        title: "Pharmacy, Chemists & Medical Supply",
        icon: <Pill size={18} className="text-blue-500" />,
        color: "bg-blue-50 border-blue-200",
        headerColor: "text-blue-600",
        items: [
          "Grocery shops & Departmental Stores",
          "Millkman",
          "Dry Fruits Dealer",
          "Edible Oil Dealers",
          "Food Production Retailer",
          "Automobile Retailer Dealers",
          "Baby Food Retailers",
          "Tablet Nail Installers",
          "Idli Butter Retailers",
        ],
      },
      {
        id: 4,
        title: "Boutiques & Tailoring",
        icon: <Scissors size={18} className="text-purple-500" />,
        color: "bg-purple-50 border-purple-200",
        headerColor: "text-purple-600",
        items: [
          "Fruits And Vegetables Home Delivery",
          "Fruits Vendors",
          "Fruits Vendors",
          "Fruits Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
        ],
      },
      {
        id: 5,
        title: "Bakery Shop & Cake Delivery",
        icon: <Cake size={18} className="text-pink-500" />,
        color: "bg-pink-50 border-pink-200",
        headerColor: "text-pink-600",
        items: [
          "Fruits And Vegetables Home Delivery",
          "Fruits Vendors",
          "Vegetable Vendors",
          "Edible Oil Dealers",
        ],
      },
      {
        id: 6,
        title: "Boutiques & Tailoring",
        icon: <Scissors size={18} className="text-indigo-500" />,
        color: "bg-indigo-50 border-indigo-200",
        headerColor: "text-indigo-600",
        items: [
          "Fruits And Vegetables Home Delivery",
          "Fruits Vendors",
          "Fruits Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Vegetable Vendors",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
          "Edible Oil Dealers",
        ],
      },
    ],
  },
};

const defaultSections = [
  {
    id: 1,
    title: "Popular Services",
    icon: <ShoppingCart size={18} className="text-orange-500" />,
    color: "bg-orange-50 border-orange-200",
    headerColor: "text-orange-600",
    items: ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5"],
  },
];

const TopCategoryDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  const categoryData = allCategories[slug];
  const label =
    categoryData?.label ||
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const sections = categoryData?.sections || defaultSections;

  return (
    <div className="min-h-screen font-sans ">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-10 bg-white ">
        <div className="w-full px-3 sm:px-6 md:px-8 py-3 md:py-4">

          <h1 className="text-center text-base sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Find Top Businesses In Your City
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            {/* Location */}
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 gap-2 sm:flex-1">
              <MapPin size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent placeholder-gray-400"
              />
            </div>
            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 gap-2 sm:flex-1">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent placeholder-gray-400"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white rounded p-1 shrink-0 transition-colors">
                <Search size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="w-full  px-3 sm:px-6 md:px-8">
        <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2">

          {/* Left trail */}
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 scrollbar-hide">

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-orange-500 hover:border-orange-500 hover:text-white text-gray-500 transition-all duration-200 shrink-0 shadow-sm"
            >
              <ArrowLeft size={13} />
            </button>

            {/* Divider */}
            <div className="w-px h-4 bg-gray-200 shrink-0" />

            {/* Home */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors duration-200 shrink-0 group"
            >
              <Home size={12} className="group-hover:text-orange-500 transition-colors" />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>

            <ChevronRight size={11} className="text-gray-300 shrink-0" />

            {/* All Categories — hidden on very small screens */}
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-400 hover:text-orange-500 font-medium transition-colors duration-200 shrink-0 whitespace-nowrap hidden xs:inline sm:inline"
            >
              All Categories
            </button>

            <ChevronRight size={11} className="text-gray-300 shrink-0 hidden sm:block" />

            {/* Current pill */}
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span className="max-w-[120px] sm:max-w-none truncate">{label}</span>
            </span>
          </div>

          {/* Right: count badge — hidden on mobile */}
          <div className="shrink-0 ml-2 hidden sm:block">
            <span className="text-[11px] text-gray-400 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 font-medium whitespace-nowrap">
              {sections.length} Categories
            </span>
          </div>

        </div>
      </div>

      {/* ── GRID ── */}
      <div className="w-full px-3 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sections.map((cat) => (
            <div
              key={cat.id}
              className={`border rounded-lg p-3 sm:p-4 ${cat.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                <div className="p-1.5 bg-white rounded-md shadow-sm shrink-0">
                  {cat.icon}
                </div>
                <h2 className={`font-semibold text-xs sm:text-sm leading-snug ${cat.headerColor}`}>
                  {cat.title}
                </h2>
              </div>
              {/* Items */}
              <ul className="space-y-0.5 sm:space-y-1">
                {cat.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[13px] sm:text-base text-gray-600 hover:text-orange-500 cursor-pointer hover:underline leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TopCategoryDetails;