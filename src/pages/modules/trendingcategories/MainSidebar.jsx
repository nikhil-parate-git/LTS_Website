import { ChevronRight, MapPin, Send, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const popularCategories = [
  "Air & Bus Ticket Agents",
  "Local Travel Agents & Tour Operators",
  "Domestic Travel Agents",
  "International Travel Agents",
  "Holiday Package Dealers",
];

const nearbyAreas = [
  { name: "All of CA", count: 14122 },
  { name: "Delhi NCR", count: 73200 },
  { name: "Mumbai", count: 41600 },
  { name: "Ajmer Gate", count: 11000 },
];

const relatedKeywords = [
  "Tour & Travel Agents in Delhi",
  "Travel Agents near Me",
  "Cheap Flight Ticket Booking",
  "Bus Ticket Booking Delhi",
  "Honeymoon Package Deals",
  "International Tour Packages",
];

export default function Sidebar({ cityName }) {
  return (
    <div className="space-y-5">
      {/* ── Enquiry Form ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 py-3">
          <p className="text-white font-bold text-sm">
            Connect with Top Agents
          </p>
          <p className="text-orange-100 text-xs mt-0.5">
            & Tour Operators in <span className="font-bold">{cityName}</span>
          </p>
        </div>
        <div className="p-4 space-y-2.5">
          <input
            placeholder="Enter your Mobile No."
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
          />
          <input
            placeholder="Enter your Name"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
          />
          <textarea
            placeholder="What is your Requirements"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none"
          />
          <button
            onClick={() => nav}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-200 hover:scale-[1.02]"
          >
            Send Enquiry
          </button>
        </div>
      </div>

      {/* ── Popular Categories ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <TrendingUp size={14} className="text-orange-500" /> Popular Category
        </h3>
        <div className="space-y-1.5">
          {popularCategories.map((cat, i) => (
            <button
              key={i}
              className="w-full text-left text-xs text-blue-600 hover:text-orange-500 hover:bg-orange-50 px-2 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            >
              <ChevronRight size={11} className="text-orange-400" /> {cat}
            </button>
          ))}
        </div>
        <button className="mt-2 text-xs font-bold text-orange-500 hover:underline">
          Show More →
        </button>
      </div>

      {/* ── Add Business CTA ── */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4">
        <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
          <Users size={13} className="text-blue-500" />
          Are you a Travel Agent in your Operational City?
        </p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
          Add your Business Listings
        </button>
      </div>

      {/* ── Nearby Areas ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
          <MapPin size={14} className="text-orange-500" /> Nearby Areas
        </h3>
        <div className="space-y-1.5">
          {nearbyAreas.map((area, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-orange-50 cursor-pointer group transition-colors"
            >
              <span className="text-blue-600 group-hover:text-orange-500 font-medium">
                {area.name}
              </span>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {area.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <button className="mt-2 text-xs font-bold text-orange-500 hover:underline">
          Show More →
        </button>
      </div>

      {/* ── Related Keywords ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">
          Most Searched Related Keywords
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {relatedKeywords.map((kw, i) => (
            <button
              key={i}
              className="text-[11px] text-blue-600 hover:text-white hover:bg-orange-500 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full transition-all font-medium"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
