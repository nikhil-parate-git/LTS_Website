import React from "react";
import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
import { fmt, convertDaysToLabel, convertDaysToMonths } from "../../../utils/subscriptionHelpers";
import FeaturesList from "./FeaturesList";

export default function PlanCard({ plan, stepNum, durIdx, onDurChange, onPurchase }) {
  const theme = THEME[plan.subCategory] || DEFAULT_THEME;

  const pricing = (plan.durations || []).map((days) => {
    const months = convertDaysToMonths(days);
    return {
      days, months,
      label:    convertDaysToLabel(days),
      total:    +Math.ceil((plan.price * (1 + plan.gst / 100) * months).toFixed(2)),
      gstAmt:   +(plan.price * months * (plan.gst / 100)).toFixed(2),
      subtotal: +(plan.price * months).toFixed(2),
    };
  });
 

  const activeIdx = pricing.length === 1 ? 0 : durIdx;
  const selected  = pricing[activeIdx];

  if (!selected) return null;

  return (
    <div className={`relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
      ${theme.featured ? "border-amber-300 shadow-xl shadow-amber-400/10" : "border-slate-200 shadow-md"}`}>
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.color}`} />

      <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500">
        {stepNum}
      </div>

      {theme.featured && (
        <div className="absolute top-5 right-5">
          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-white px-2.5 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 pt-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          {plan.image
            ? <img className="w-14 h-14 object-contain" src={plan.image} alt={plan.subCategory} />
            : <span className="text-3xl">{theme.emoji}</span>
          }
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">Plan</div>
            <div className={`text-3xl font-extrabold tracking-tight bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}>
              {plan.subCategory}
            </div>
          </div>
        </div>

        {plan.description && (
          <p className="text-slate-500 text-[13px] leading-relaxed mb-6 min-h-[40px]">{plan.description}</p>
        )}

        {pricing.length > 1 && (
          <div className="mb-5">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
              Select Duration
            </div>
            <div className="grid gap-1.5 bg-slate-100 rounded-xl p-1"
              style={{ gridTemplateColumns: `repeat(${pricing.length}, 1fr)` }}>
              {pricing.map((p, i) => (
                <button key={p.days} onClick={() => onDurChange(i)}
                  className={`py-2 px-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200 ${
                    i === activeIdx
                      ? theme.featured
                        ? "bg-amber-400 text-white shadow-sm"
                        : "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Base / month</div>
              <div className="text-3xl font-black tracking-tight text-slate-800">₹{fmt(plan.price)}</div>
            </div>
            {selected.months > 1 && (
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">Total charge</div>
                <div className={`text-base font-black ${theme.accent}`}>₹{fmt(selected.total)}</div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
            <span className="text-[11px] text-slate-400">
              {selected.months > 1
                ? `₹${fmt(plan.price)} × ${selected.months} mo + ${plan.gst}% GST`
                : `+ ${plan.gst}% GST (₹${fmt(selected.gstAmt)})`
              }
            </span>
            <span className={`font-extrabold text-lg ${theme.accent}`}>₹{fmt(selected.total)}/-</span>
          </div>
        </div>

        <div className="mb-6">
          <FeaturesList
            features={plan.features}
            dotClass={theme.dot}
            moreBtnClass={theme.moreBtn}
          />
        </div>

        <div className="flex-1" />

        <button
          onClick={() => onPurchase(plan, selected.days)}
          className={`w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase text-white transition-all duration-200 shadow-lg ${theme.btn} ${theme.shadow}`}>
          Get {plan.subCategory} Plan →
        </button>
      </div>
    </div>
  );
}