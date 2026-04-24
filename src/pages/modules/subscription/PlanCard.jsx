// import React from "react";
// import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
// import { fmt } from "../../../utils/subscriptionHelpers";
// import FeaturesList from "./FeaturesList";

// function fmtLeads(leads) {
//   if (!leads || leads === "0") return null;
//   if (leads === "unlimited") return { unlimited: true };
//   if (typeof leads === "string" && leads.includes("-")) {
//     const [from, to] = leads.split("-").map((n) => parseInt(n.trim(), 10));
//     if (!isNaN(from) && !isNaN(to)) return { from, to };
//   }
//   return null;
// }

// function LeadsBar({ leads, themeColor, accentClass }) {
//   const parsed = fmtLeads(leads);
//   if (!parsed) return null;

//   if (parsed.unlimited) {
//     return (
//       <div className="mb-5 rounded-xl px-4 py-3 border bg-amber-50 border-amber-200">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//             Leads Included
//           </span>
//           <span className="text-sm font-black text-amber-500">Unlimited</span>
//         </div>
//         <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
//           <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 w-full" />
//         </div>
//       </div>
//     );
//   }

//   const { from, to } = parsed;

//   return (
//     <div className="mb-5 rounded-xl px-4 py-3 border bg-slate-50 border-slate-100">
//       <div className="flex items-center justify-between mb-2">
//         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//           Leads Included
//         </span>
//         <span className={`text-sm font-black ${accentClass}`}>
//           {fmt(from)} – {fmt(to)}
//         </span>
//       </div>
//       <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
//         <div
//           className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${themeColor} opacity-25`}
//           style={{ width: "100%" }}
//         />
//         <div
//           className={`absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r ${themeColor}`}
//           style={{ width: "50%" }}
//         />
//       </div>
//       <div className="flex justify-between mt-1.5">
//         <span className="text-[10px] font-semibold text-slate-400">
//           Min {fmt(from)}
//         </span>
//         <span className="text-[10px] font-semibold text-slate-400">
//           Max {fmt(to)}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function PlanCard({
//   plan,
//   stepNum,
//   selectedDurId,
//   onDurChange,
//   onPurchase,
// }) {
//   const theme = THEME[plan.subCategory] || DEFAULT_THEME;
//   const durations = plan.durations || [];

//   const selected =
//     durations.find((d) => d._id === selectedDurId) || durations[0];

//   if (!selected) return null;

//   const months = Math.max(1, Math.round(selected.duration / 30));

//   return (
//     <div
//       className={`relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full h-full
//       ${theme.featured ? "border-amber-300 shadow-xl shadow-amber-400/10" : "border-slate-200 shadow-md"}`}
//     >
//       <div className={`h-1.5 w-full bg-gradient-to-r ${theme.color}`} />

//       <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500">
//         {stepNum}
//       </div>

//       {theme.featured && (
//         <div className="absolute top-5 right-5">
//           <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-white px-2.5 py-1 rounded-full">
//             Most Popular
//           </span>
//         </div>
//       )}

//       <div className="p-7 pt-10 flex flex-col flex-1">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-3">
//           {plan.image ? (
//             <img
//               className="w-14 h-14 object-contain"
//               src={plan.image}
//               alt={plan.subCategory}
//             />
//           ) : (
//             <span className="text-3xl">{theme.emoji}</span>
//           )}
//           <div>
//             <div className="text-xs font-semibold tracking-widest uppercase text-slate-400">
//               Plan
//             </div>
//             <div
//               className={`text-3xl font-extrabold tracking-tight bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}
//             >
//               {plan.subCategory}
//             </div>
//           </div>
//         </div>

//         {plan.description && (
//           <p className="text-slate-500 text-[13px] leading-relaxed mb-6 min-h-[40px]">
//             {plan.description}
//           </p>
//         )}

//         {/* Duration pills */}
//         <div className="mb-5">
//           <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-2">
//             {durations.length > 1 ? "Select Duration" : "Duration"}
//           </div>
//           <div
//             className="grid gap-1.5 bg-slate-100 rounded-xl p-1"
//             style={{ gridTemplateColumns: `repeat(${durations.length}, 1fr)` }}
//           >
//             {durations.map((d) => (
//               <button
//                 key={d._id}
//                 onClick={() => onDurChange(d._id)}
//                 className={`py-2 px-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200 ${
//                   d._id === selected._id
//                     ? theme.featured
//                       ? "bg-amber-400 text-white shadow-sm"
//                       : "bg-white text-slate-800 shadow-sm"
//                     : "text-slate-400 hover:text-slate-600"
//                 }`}
//               >
//                 {`${d.durationInMonths} Month${d.durationInMonths > 1 ? "s" : ""}`}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Pricing box */}
//         <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
//           <div className="flex items-end justify-between mb-3">
//             <div>
//               <div className="text-[11px] text-slate-400 font-medium mb-0.5">
//                 Base Price
//               </div>
//               <div className="text-3xl font-black tracking-tight text-slate-800">
//                 ₹{fmt(selected.price)}
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-[11px] text-slate-400 font-medium mb-0.5">
//                 GST @{selected.gst}%
//               </div>
//               <div className="text-sm font-bold text-slate-500">
//                 ₹{fmt(Math.round((selected.price * selected.gst) / 100))}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
//             <span className="text-[11px] text-slate-400">Total Payable</span>
//             <span className={`font-extrabold text-lg ${theme.accent}`}>
//               ₹{fmt(selected.totalPayable)}/-
//             </span>
//           </div>
//         </div>

//         {/* Leads bar */}
//         <LeadsBar
//           leads={selected.leads}
//           themeColor={theme.color}
//           accentClass={theme.accent}
//         />

//         {/* Features */}
//         <div className="mb-6">
//           <FeaturesList
//             features={plan.features}
//             dotClass={theme.dot}
//             moreBtnClass={theme.moreBtn}
//           />
//         </div>

//         <div className="flex-1" />

//         {/* Purchase button */}
//         <button
//           onClick={() => onPurchase(plan, selected._id)}
//           className={`w-full cursor-pointer py-3.5 rounded-xl text-[13px] font-extrabold tracking-widest uppercase text-white transition-all duration-200 shadow-lg ${theme.btn} ${theme.shadow}`}
//         >
//           Get {plan.subCategory} Plan →
//         </button>

//         {months > 1 && selected.perMonthPrice && (
//           <p className="text-center text-[11px] text-slate-400 mt-2">
//             ≈ ₹{fmt(selected.perMonthPrice)}/mo billed{" "}
//             {months >= 24
//               ? "every 2 years"
//               : months >= 12
//                 ? "annually"
//                 : `every ${months} months`}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
import { fmt } from "../../../utils/subscriptionHelpers";
import FeaturesList from "./FeaturesList";

function fmtLeads(leads) {
  if (!leads || leads === "0") return null;
  if (leads === "unlimited") return { unlimited: true };
  if (typeof leads === "string" && leads.includes("-")) {
    const [from, to] = leads.split("-").map((n) => parseInt(n.trim(), 10));
    if (!isNaN(from) && !isNaN(to)) return { from, to };
  }
  return null;
}

function LeadsBar({ leads, themeColor, accentClass }) {
  const parsed = fmtLeads(leads);
  if (!parsed) return null;

  if (parsed.unlimited) {
    return (
      <div
        className="mb-4 sm:mb-5 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border bg-amber-50 border-amber-200"
        aria-label="Unlimited leads included"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Leads Included
          </span>
          <span className="text-xs sm:text-sm font-black text-amber-500">
            Unlimited
          </span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 w-full"
            role="progressbar"
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }

  const { from, to } = parsed;

  return (
    <div
      className="mb-4 sm:mb-5 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border bg-slate-50 border-slate-100"
      aria-label={`Leads included: ${fmt(from)} to ${fmt(to)}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Leads Included
        </span>
        <span className={`text-xs sm:text-sm font-black ${accentClass}`}>
          {fmt(from)} – {fmt(to)}
        </span>
      </div>
      <div className="relative w-full bg-slate-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${themeColor} opacity-25`}
          style={{ width: "100%" }}
        />
        <div
          className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${themeColor}`}
          style={{ width: "50%" }}
          role="progressbar"
          aria-valuenow={50}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between mt-1 sm:mt-1.5">
        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400">
          Min {fmt(from)}
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400">
          Max {fmt(to)}
        </span>
      </div>
    </div>
  );
}

export default function PlanCard({
  plan,
  stepNum,
  selectedDurId,
  onDurChange,
  onPurchase,
}) {
  const theme = THEME[plan.subCategory] || DEFAULT_THEME;
  const durations = plan.durations || [];

  const selected =
    durations.find((d) => d._id === selectedDurId) || durations[0];

  if (!selected) return null;

  const months = Math.max(1, Math.round(selected.duration / 30));

  // SEO: JSON-LD structured data for this plan
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plan.subCategory} Plan — Local Trade Street`,
    description:
      plan.description ||
      `${plan.subCategory} subscription plan for local businesses on Local Trade Street.`,
    image: plan.image || undefined,
    brand: {
      "@type": "Brand",
      name: "Local Trade Street",
    },
    offers: {
      "@type": "Offer",
      price: selected.totalPayable,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Local Trade Street",
        url: "https://localtradestreet.com",
      },
    },
  };

  return (
    <article
      className={`relative flex flex-col bg-white border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full h-full
        ${
          theme.featured
            ? "border-amber-300 shadow-xl shadow-amber-400/10"
            : "border-slate-200 shadow-md"
        }`}
      aria-label={`${plan.subCategory} plan — ₹${fmt(selected.totalPayable)}`}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={`h-1 sm:h-1.5 w-full bg-gradient-to-r ${theme.color}`} />

      {/* Step number */}
      <div
        className="absolute top-3 sm:top-5 left-3 sm:left-5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] sm:text-[11px] font-black text-slate-500"
        aria-label={`Step ${stepNum}`}
      >
        {stepNum}
      </div>

      {/* Most Popular badge */}
      {theme.featured && (
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-amber-400 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-4 sm:p-6 md:p-7 pt-8 sm:pt-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          {plan.image ? (
            <img
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              src={plan.image}
              alt={`${plan.subCategory} plan icon`}
              width={56}
              height={56}
              loading="lazy"
              itemProp="image"
            />
          ) : (
            <span className="text-2xl sm:text-3xl" aria-hidden="true">
              {theme.emoji}
            </span>
          )}
          <div>
            <div className="text-[9px] sm:text-xs font-semibold tracking-widest uppercase text-slate-400">
              Plan
            </div>
            <h2
              className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${theme.color} bg-clip-text text-transparent`}
              itemProp="name"
            >
              {plan.subCategory}
            </h2>
          </div>
        </div>

        {plan.description && (
          <p
            className="text-slate-500 text-[12px] sm:text-[13px] leading-relaxed mb-4 sm:mb-6 min-h-[36px] sm:min-h-[40px]"
            itemProp="description"
          >
            {plan.description}
          </p>
        )}

        {/* Duration pills */}
        <div className="mb-4 sm:mb-5">
          <div className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-1.5 sm:mb-2">
            {durations.length > 1 ? "Select Duration" : "Duration"}
          </div>
          <div
            className="grid gap-1 sm:gap-1.5 bg-slate-100 rounded-xl p-1"
            style={{
              gridTemplateColumns: `repeat(${Math.min(durations.length, 4)}, 1fr)`,
            }}
            role="group"
            aria-label="Select plan duration"
          >
            {durations.map((d) => (
              <button
                key={d._id}
                onClick={() => onDurChange(d._id)}
                aria-pressed={d._id === selected._id}
                aria-label={`${d.durationInMonths} month${d.durationInMonths > 1 ? "s" : ""} duration`}
                className={`py-1.5 sm:py-2 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide transition-all duration-200 ${
                  d._id === selected._id
                    ? theme.featured
                      ? "bg-amber-400 text-white shadow-sm"
                      : "bg-white text-slate-800 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {`${d.durationInMonths}M${d.durationInMonths > 1 ? "" : ""}`}
                <span className="hidden sm:inline">
                  {d.durationInMonths > 1 ? "onths" : "onth"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing box */}
        <div
          className="bg-slate-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 border border-slate-100"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="INR" />
          <meta itemProp="price" content={selected.totalPayable} />
          <meta itemProp="availability" content="https://schema.org/InStock" />

          <div className="flex items-end justify-between mb-2 sm:mb-3">
            <div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">
                Base Price
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
                ₹{fmt(selected.price)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">
                GST @{selected.gst}%
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-500">
                ₹{fmt(Math.round((selected.price * selected.gst) / 100))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-slate-200">
            <span className="text-[10px] sm:text-[11px] text-slate-400">
              Total Payable
            </span>
            <span
              className={`font-extrabold text-base sm:text-lg ${theme.accent}`}
            >
              ₹{fmt(selected.totalPayable)}/-
            </span>
          </div>
        </div>

        {/* Leads bar */}
        <LeadsBar
          leads={selected.leads}
          themeColor={theme.color}
          accentClass={theme.accent}
        />

        {/* Features */}
        <div className="mb-4 sm:mb-6">
          <FeaturesList
            features={plan.features}
            dotClass={theme.dot}
            moreBtnClass={theme.moreBtn}
          />
        </div>

        <div className="flex-1" />

        {/* Purchase button */}
        <button
          onClick={() => onPurchase(plan, selected._id)}
          aria-label={`Get ${plan.subCategory} plan for ₹${fmt(selected.totalPayable)}`}
          className={`w-full cursor-pointer py-3 sm:py-3.5 rounded-xl text-[12px] sm:text-[13px] font-extrabold tracking-widest uppercase text-white transition-all duration-200 shadow-lg ${theme.btn} ${theme.shadow}`}
        >
          Get {plan.subCategory} Plan →
        </button>

        {months > 1 && selected.perMonthPrice && (
          <p className="text-center text-[10px] sm:text-[11px] text-slate-400 mt-1.5 sm:mt-2">
            ≈ ₹{fmt(selected.perMonthPrice)}/mo billed{" "}
            {months >= 24
              ? "every 2 years"
              : months >= 12
                ? "annually"
                : `every ${months} months`}
          </p>
        )}
      </div>
    </article>
  );
}
