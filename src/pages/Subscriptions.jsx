import { useState } from "react";
// import silver from "../assets/silver.jpeg";
import silver from "../assets/silver.jpeg"
import platinum from "../assets/platinum.jpeg";
import gold from "../assets/gold.jpeg";
import Navbar from "../components/Layouts/navbar";
import Footer from "./Footer";

const plans = [
  {
    id: "silver",
    icon: silver,
    label: "Dynamic",
    tag: null,
    featured: false,
    durations: [
      { label: "1 Month", leads: 50, base: 2000, gst: 360, total: 2360 },
      { label: "6 Months", leads: 300, base: 11000, gst: 1980, total: 12980 },
      { label: "12 Months", leads: 600, base: 22000, gst: 3960, total: 25960 },
    ],
    color: "from-slate-400 to-slate-300",
    dotColor: "bg-slate-400",
    textAccent: "text-slate-500",
    barColor: "bg-slate-400",
    tagline: "Perfect for growing businesses starting to build their lead pipeline.",
  },
  {
    id: "gold",
    icon: gold,
    label: "Gold",
    tag: "Most Popular",
    featured: true,
    durations: [
      { label: "1 Month", leads: 200, base: 5000, gst: 900, total: 5900 },
      { label: "6 Months", leads: 1200, base: 25000, gst: 4500, total: 29500 },
      { label: "12 Months", leads: 2400, base: 50000, gst: 9000, total: 59000 },
    ],
    color: "from-yellow-500 to-amber-600",
    dotColor: "bg-yellow-500",
    textAccent: "text-amber-700",
    barColor: "bg-yellow-500",
    tagline: "Designed for established businesses ready to scale qualified leads.",
  },
  {
    id: "platinum",
    icon: platinum,
    label: "Diamond",
    tag: null,
    featured: false,
    durations: [
      { label: "1 Month", leads: "unlimited", base: 10000, gst: 1800, total: 11800 },
      { label: "6 Months", leads: "unlimited", base: 50000, gst: 9000, total: 59000 },
      { label: "12 Months", leads: "unlimited", base: 100000, gst: 18000, total: 118000 },
    ],
    color: "from-indigo-500 to-purple-500",
    dotColor: "bg-indigo-500",
    textAccent: "text-indigo-600",
    barColor: "bg-indigo-500",
    tagline: "Enterprise-grade reach for high-volume businesses and agencies.",
  },
];

const maxLeadsByDur = [199, 299, 500];

function fmt(n) {
  return n.toLocaleString("en-IN");
}

/* ─── Prime Onboarding Card ─── */
function PrimeCard() {
  return (
    <div className="relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-cyan-300" />
      <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600">
        1
      </div>
      <div className="p-7 pt-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🔰</span>
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">Onboarding</div>
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Prime
            </div>
          </div>
        </div>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
          Get your business verified and listed on the Technoro platform. Required before any lead plan.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex-1">
          <div className="text-[11px] text-slate-400 font-medium mb-1">One-time · Incl. GST</div>
          <div className="text-4xl font-black tracking-tight text-slate-800 mb-4">
            ₹499<span className="text-lg text-slate-400 font-semibold">/-</span>
          </div>
          <div className="flex flex-col gap-2">
            {["1 Year Validity", "Verified Vendor Badge", "Business profile listed", "Trust & reliability seal"].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
        <button className="w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20">
          Get Started →
        </button>
        <div className="text-center text-[11px] text-slate-400 mt-2.5">
          Step 1 · Required for all lead plans
        </div>
      </div>
    </div>
  );
}

/* ─── Lead Plan Card ─── */
function PlanCard({ plan, durIdx, onDurChange, stepNum }) {
  const dur = plan.durations[durIdx];
  
  // LOGIC: Sirf Silver (Dynamic) aur Gold ke liye custom progress
  let leadsPct;
  if (plan.id === "silver" || plan.id === "gold") {
    leadsPct = durIdx === 0 ? 25 : durIdx === 1 ? 50 : 100;
  } else {
    // Diamond ya any other plan ke liye purana logic ya 100%
    leadsPct = dur.leads === "unlimited" ? 100 : Math.round((dur.leads / maxLeadsByDur[durIdx]) * 100);
  }

  return (
    <div
      className={`
        relative flex flex-col bg-white border rounded-2xl overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
        ${plan.featured ? "border-amber-300 shadow-xl shadow-amber-400/10" : "border-slate-200 shadow-md"}
      `}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${plan.color}`} />
      <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500">
        {stepNum}
      </div>
      {plan.tag && (
        <div className="absolute top-5 right-5">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-400 text-white px-2.5 py-1 rounded-full">
            {plan.tag}
          </span>
        </div>
      )}
      <div className="p-7 pt-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <img className="w-14 h-14" src={plan.icon} alt={plan.label} />
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">Plan</div>
            <div className={`text-3xl font-extrabold tracking-tight bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
              {plan.label}
            </div>
          </div>
        </div>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-6 min-h-[40px]">{plan.tagline}</p>
        <div className="mb-5">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">Select Duration</div>
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 rounded-xl p-1">
            {plan.durations.map((d, i) => (
              <button
                key={i}
                onClick={() => onDurChange(i)}
                className={`
                  py-2 px-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200
                  ${durIdx === i
                    ? plan.featured ? "bg-amber-400 text-white shadow-sm" : "bg-white text-slate-800 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"}
                `}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Base Price</div>
              <div className="text-3xl font-black tracking-tight text-slate-800">₹{fmt(dur.base)}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">GST @18%</div>
              <div className="text-base font-bold text-[10px] text-slate-500">₹{fmt(dur.gst)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
            <span className="text-[12px] font-semibold text-slate-500">Total Payable</span>
            <span className={`font-extrabold text-lg ${plan.textAccent}`}>₹{fmt(dur.total)}/-</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">Monthly Leads</span>
            <span className={`text-sm font-extrabold ${plan.textAccent}`}>{dur.leads} leads/mo</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${plan.barColor}`} 
              style={{ width: `${leadsPct}%` }} 
            />
          </div>
        </div>
        <div className="border-t border-slate-100 mb-5" />
        <button
          className={`
            w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase transition-all duration-200
            ${plan.featured
              ? "bg-amber-400 text-white hover:bg-amber-500 shadow-lg shadow-amber-400/30"
              : "bg-slate-900 text-white hover:bg-slate-700"}
          `}
        >
          Get {plan.label} Plan →
        </button>
        {durIdx > 0 && (
          <div className="text-center text-[11px] text-slate-400 mt-2.5">
            ≈ ₹{fmt(Math.round(dur.total / (durIdx === 1 ? 6 : 12)))}/mo billed {durIdx === 1 ? "every 6 months" : "annually"}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Subscription() {
  const [durIdxMap, setDurIdxMap] = useState({ silver: 0, gold: 0, platinum: 0 });
  const setDur = (planId, idx) => setDurIdxMap((prev) => ({ ...prev, [planId]: idx }));
  const syncAll = (idx) => setDurIdxMap({ silver: idx, gold: idx, platinum: idx });

  const steps = [
    { num: 1, label: "Prime", color: "bg-gradient-to-r from-blue-500 to-cyan-400" },
    { num: 2, label: "Dynamic", color: "bg-slate-400" },
    { num: 3, label: "Gold", color: "bg-amber-400" },
    { num: 4, label: "Diamond", color: "bg-indigo-500" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          * { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}</style>
        <div className="max-w-7xl mx-auto px-5 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Membership Plans
            </div>
            <h1 className="text-[clamp(36px,5vw,60px)] font-black tracking-tight leading-tight text-slate-900 mb-5">
              Choose the right plan<br />
              <span className="text-slate-400 font-light italic">for your business.</span>
            </h1>
            <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed mb-10">
              Start with Prime onboarding, then pick a lead plan that fits your growth goals.
              GST @18% applied as per government regulations.
            </p>
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 pl-3 pr-1 tracking-wider whitespace-nowrap">
                Compare lead plans by:
              </span>
              {["1 Month", "6 Months", "12 Months"].map((label, i) => (
                <button
                  key={i}
                  onClick={() => syncAll(i)}
                  className={`
                    px-4 py-2 rounded-xl text-[12px] font-bold tracking-wide transition-all duration-200 whitespace-nowrap
                    ${Object.values(durIdxMap).every((v) => v === i)
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700"}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[12px] font-semibold text-slate-600">
                  <span className={`w-5 h-5 rounded-full ${s.color} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0`}>
                    {s.num}
                  </span>
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <PrimeCard />
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                durIdx={durIdxMap[plan.id]}
                onDurChange={(idx) => setDur(plan.id, idx)}
                stepNum={i + 2}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}






