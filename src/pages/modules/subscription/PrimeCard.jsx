import React from "react";
import { THEME } from "../../../constants/subscriptionThemes";
import { fmt } from "../../../utils/subscriptionHelpers";
import FeaturesList from "./FeaturesList";

export default function PrimeCard({ plan, stepNum, onPurchase }) {
  const dur          = plan.durations?.[0];
  const totalPayable = dur?.totalPayable ?? 0;

  return (
    <div className="relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 to-cyan-300" />
      <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600">
        {stepNum}
      </div>

      <div className="p-7 pt-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {plan.image
            ? <img src={plan.image} alt={plan.subCategory} className="w-12 h-12 object-contain" />
            : <span className="text-3xl">🔰</span>
          }
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">Onboarding</div>
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {plan.subCategory}
            </div>
          </div>
        </div>

        {plan.description && (
          <p className="text-slate-500 text-[13px] leading-relaxed mb-6">{plan.description}</p>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex-1">
          <div className="text-[11px] text-slate-400 font-medium mb-1">One-time · Incl. GST</div>
          <div className="text-4xl font-black tracking-tight text-slate-800 mb-4">
            ₹{fmt(totalPayable)}<span className="text-lg text-slate-400 font-semibold">/-</span>
          </div>
          <FeaturesList
            features={plan.features}
            dotClass="bg-blue-400"
            moreBtnClass={THEME.Prime?.moreBtn || "border-blue-200 text-blue-600 hover:bg-blue-50"}
          />
        </div>

        {/* Pass duration _id instead of duration days */}
        <button
          onClick={() => onPurchase(plan, dur?._id)}
          className="w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20">
          Get Started →
        </button>
      </div>
    </div>
  );
}