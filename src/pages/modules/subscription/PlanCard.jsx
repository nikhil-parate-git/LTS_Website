import React from "react";
import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
import { fmt } from "../../../utils/subscriptionHelpers";
import FeaturesList from "./FeaturesList";

/**
 * PlanCard
 * Works with the new model where each duration entry has its own
 * { duration, price, gst, leads } — price is NOT top-level anymore.
 */

/** Parses "100-200" → { from: 100, to: 200 }. Returns null for "0" or bad input. */
function fmtLeads(leads) {
  if (!leads || leads === "0") return null;
  if (leads === "unlimited") return { unlimited: true };
  if (typeof leads === "string" && leads.includes("-")) {
    const [from, to] = leads.split("-").map((n) => parseInt(n.trim(), 10));
    if (!isNaN(from) && !isNaN(to)) return { from, to };
  }
  return null;
}

/** Renders a leads progress bar based on the parsed range */
function LeadsBar({ leads, themeColor, accentClass }) {
  const parsed = fmtLeads(leads);
  if (!parsed) return null;

  if (parsed.unlimited) {
    return (
      <div className="mb-5 rounded-xl px-4 py-3 border bg-amber-50 border-amber-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Leads Included
          </span>
          <span className="text-sm font-black text-amber-500">Unlimited</span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 w-full" />
        </div>
      </div>
    );
  }

  const { from, to } = parsed;

  // "from" fills ~50% of bar width, "to" fills 100% — shows the range visually
  const fromPct = 50;
  const toPct   = 100;

  return (
    <div className="mb-5 rounded-xl px-4 py-3 border bg-slate-50 border-slate-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Leads Included
        </span>
        <span className={`text-sm font-black ${accentClass}`}>
          {fmt(from)} – {fmt(to)}
        </span>
      </div>

      {/* Progress bar: faded full-width for "to", solid half-width for "from" */}
      <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${themeColor} opacity-25`}
          style={{ width: `${toPct}%` }}
        />
        <div
          className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${themeColor}`}
          style={{ width: `${fromPct}%` }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] font-semibold text-slate-400">Min {fmt(from)}</span>
        <span className="text-[10px] font-semibold text-slate-400">Max {fmt(to)}</span>
      </div>
    </div>
  );
}

export default function PlanCard({ plan, stepNum, durIdx, onDurChange, onPurchase }) {
  const theme     = THEME[plan.subCategory] || DEFAULT_THEME;
  const durations = plan.durations || [];
  const activeIdx = durations.length === 1 ? 0 : durIdx;
  const selected  = durations[activeIdx];

  if (!selected) return null;

  const months = Math.max(1, Math.round(selected.duration / 30));

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
        {/* Header */}
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

        {/* Duration pills */}
        {durations.length > 1 && (
          <div className="mb-5">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
              Select Duration
            </div>
            <div
              className="grid gap-1.5 bg-slate-100 rounded-xl p-1"
              style={{ gridTemplateColumns: `repeat(${durations.length}, 1fr)` }}
            >
              {durations.map((d, i) => (
                <button key={d.duration} onClick={() => onDurChange(i)}
                  className={`py-2 px-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200 ${
                    i === activeIdx
                      ? theme.featured
                        ? "bg-amber-400 text-white shadow-sm"
                        : "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}>
                  {`${d.durationInMonths} Month${d.durationInMonths > 1 ? "s" : ""}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {durations.length === 1 && (
            <div className="mb-5">
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
               Duration
            </div>
            <div
              className="grid gap-1.5 bg-slate-100 rounded-xl p-1"
              style={{ gridTemplateColumns: `repeat(${durations.length}, 1fr)` }}
            >
              {durations.map((d, i) => (
                <button key={d.duration} onClick={() => onDurChange(i)}
                  className={`py-2 px-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200 ${
                    i === activeIdx
                      ? theme.featured
                        ? "bg-amber-400 text-white shadow-sm"
                        : "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}>
                  {`${d.durationInMonths} Month${d.durationInMonths > 1 ? "s" : ""}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing box */}
        <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Base Price</div>
              <div className="text-3xl font-black tracking-tight text-slate-800">
                ₹{fmt(selected.price)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">GST @{selected.gst}%</div>
              <div className="text-sm font-bold text-slate-500">
                ₹{fmt(Math.round(selected.price * selected.gst / 100))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
            <span className="text-[11px] text-slate-400">Total Payable</span>
            <span className={`font-extrabold text-lg ${theme.accent}`}>
              ₹{fmt(selected.totalPayable)}/-
            </span>
          </div>
        </div>

        {/* Leads progress bar */}
        <LeadsBar
          leads={selected.leads}
          themeColor={theme.color}
          accentClass={theme.accent}
        />

        {/* Features */}
        <div className="mb-6">
          <FeaturesList
            features={plan.features}
            dotClass={theme.dot}
            moreBtnClass={theme.moreBtn}
          />
        </div>

        <div className="flex-1" />

        <button
          onClick={() => onPurchase(plan, selected.duration)}
          className={`w-full py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase text-white transition-all duration-200 shadow-lg ${theme.btn} ${theme.shadow}`}>
          Get {plan.subCategory} Plan →
        </button>

        {months > 1 && selected.perMonthPrice && (
          <p className="text-center text-[11px] text-slate-400 mt-2">
            ≈ ₹{fmt(selected.perMonthPrice)}/mo billed {months >= 24 ? "every 2 years" : months >= 12 ? "annually" : `every ${months} months`}
          </p>
        )}
      </div>
    </div>
  );
}