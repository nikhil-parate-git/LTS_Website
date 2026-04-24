// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { ArrowLeft } from "lucide-react";
// import {
//   fetchPublicPlans,
//   clearPaymentInfo,
// } from "../../../redux/slice/plansSlice";
// import { THEME } from "../../../constants/subscriptionThemes";
// import PrimeCard from "../../modules/subscription/PrimeCard";
// import PlanCard from "../../modules/subscription/PlanCard";
// import PurchaseModal from "../../modules/subscription/PurchaseModal";
// import PaymentSuccessCard from "../../modules/subscription/PaymentSuccessCard";
// import SkeletonCard from "../../modules/subscription/SkeletonCard";

// const SYNC_OPTIONS = [
//   { days: 30, label: "1 Month" },
//   { days: 180, label: "6 Months" },
//   { days: 365, label: "1 Year" },
// ];

// export default function Subscription() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { list: allPlans, loading, paymentInfo } = useSelector((s) => s.plans);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState(null);
//   const [durIdMap, setDurIdMap] = useState({});

//   useEffect(() => {
//     dispatch(fetchPublicPlans());
//   }, [dispatch]);

//   const onboardingPlans = allPlans.filter((p) => p.category === "ONBOARDING");
//   const leadPlans = allPlans.filter((p) => p.category === "PLAN");
//   const allSteps = [...onboardingPlans, ...leadPlans];
//   const totalCards = onboardingPlans.length + leadPlans.length;

//   const setDur = (planId, durId) =>
//     setDurIdMap((prev) => ({ ...prev, [planId]: durId }));

//   const handlePurchase = (plan, durId) => {
//     setSelectedPlan(plan);
//     setSelectedDuration(durId);
//     setShowModal(true);
//   };

//   const syncAll = (days) => {
//     const next = {};
//     leadPlans.forEach((p) => {
//       const match = (p.durations || []).find((d) => d.duration === days);
//       if (match) next[p._id] = match._id;
//     });
//     setDurIdMap(next);
//   };

//   const validSync = SYNC_OPTIONS.map(({ days }) =>
//     leadPlans.some((p) => (p.durations || []).some((d) => d.duration === days)),
//   );

//   const isSyncActive = (days) =>
//     leadPlans.every((p) => {
//       const match = (p.durations || []).find((d) => d.duration === days);
//       if (!match) return true;
//       const activeDurId = durIdMap[p._id] ?? p.durations?.[0]?._id;
//       return activeDurId === match._id;
//     });

//   // Dynamic grid cols based on total card count
//   const gridCols =
//     totalCards === 1
//       ? "grid-cols-1 max-w-sm mx-auto"
//       : totalCards === 2
//         ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
//         : totalCards === 3
//           ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
//           : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

//   return (
//     <div className="min-h-screen bg-white pb-20">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif; }
//       `}</style>

//       {paymentInfo && (
//         <PaymentSuccessCard
//           info={paymentInfo}
//           onDone={() => {
//             dispatch(clearPaymentInfo());
//             navigate("/subscriptions");
//           }}
//         />
//       )}

//       {showModal && selectedPlan && (
//         <PurchaseModal
//           plan={selectedPlan}
//           selectedDuration={selectedDuration}
//           onClose={() => setShowModal(false)}
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-5 py-16">
//         {/* Back */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="group flex items-center gap-2 w-fit text-slate-500 hover:text-slate-900 transition-colors duration-200"
//           >
//             <span className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-slate-400 group-hover:shadow-md transition-all duration-200">
//               <ArrowLeft size={16} />
//             </span>
//           </button>
//         </div>

//         {/* Heading */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
//             <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
//             Membership Plans
//           </div>
//           <h1 className="text-[clamp(36px,5vw,60px)] font-black tracking-tight leading-tight text-slate-900 mb-5">
//             Choose the right plan
//             <br />
//             <span className="text-slate-400 font-light italic">
//               for your business.
//             </span>
//           </h1>

//           {/* Duration sync bar */}
//           {leadPlans.length > 0 && !loading && (
//             <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm mt-8">
//               <span className="text-[11px] font-semibold text-slate-400 pl-3 pr-1 tracking-wider">
//                 Compare plans by:
//               </span>
//               {SYNC_OPTIONS.map(({ days, label }, i) =>
//                 validSync[i] ? (
//                   <button
//                     key={days}
//                     onClick={() => syncAll(days)}
//                     className={`px-4 py-2 rounded-xl text-[12px] font-bold tracking-wide transition-all duration-200 ${
//                       isSyncActive(days)
//                         ? "bg-slate-900 text-white shadow-sm"
//                         : "text-slate-500 hover:text-slate-700"
//                     }`}
//                   >
//                     {label}
//                   </button>
//                 ) : null,
//               )}
//             </div>
//           )}
//         </div>

//         {/* Steps strip */}
//         {!loading && allSteps.length > 0 && (
//           <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto py-2">
//             {allSteps.map((p, i) => {
//               const theme = THEME[p.subCategory];
//               const color =
//                 p.category === "ONBOARDING"
//                   ? "bg-gradient-to-r from-blue-500 to-cyan-400"
//                   : theme
//                     ? `bg-gradient-to-r ${theme.color}`
//                     : "bg-slate-400";
//               return (
//                 <div
//                   key={p._id}
//                   className="flex items-center gap-2 flex-shrink-0"
//                 >
//                   <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[12px] font-semibold text-slate-600">
//                     <span
//                       className={`w-5 h-5 rounded-full ${color} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0`}
//                     >
//                       {i + 1}
//                     </span>
//                     {p.subCategory}
//                   </div>
//                   {i < allSteps.length - 1 && (
//                     <svg
//                       className="w-4 h-4 text-slate-300 flex-shrink-0"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2.5}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Cards */}
//         {loading ? (
//           <div className={`grid gap-5 ${gridCols}`}>
//             {[...Array(4)].map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : allPlans.length === 0 ? (
//           <div className="text-center py-20 text-slate-400 text-sm">
//             No plans available right now.
//           </div>
//         ) : (
//           <div className={`grid gap-5 mb-12 ${gridCols}`}>
//             {onboardingPlans.map((plan, i) => (
//               <PrimeCard
//                 key={plan._id}
//                 plan={plan}
//                 stepNum={i + 1}
//                 onPurchase={handlePurchase}
//               />
//             ))}
//             {leadPlans.map((plan, i) => (
//               <PlanCard
//                 key={plan._id}
//                 plan={plan}
//                 stepNum={onboardingPlans.length + i + 1}
//                 selectedDurId={durIdMap[plan._id] ?? plan.durations?.[0]?._id}
//                 onDurChange={(durId) => setDur(plan._id, durId)}
//                 onPurchase={handlePurchase}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import {
  fetchPublicPlans,
  clearPaymentInfo,
} from "../../../redux/slice/plansSlice";
import { THEME } from "../../../constants/subscriptionThemes";
import PrimeCard from "../../modules/subscription/PrimeCard";
import PlanCard from "../../modules/subscription/PlanCard";
import PurchaseModal from "../../modules/subscription/PurchaseModal";
import PaymentSuccessCard from "../../modules/subscription/PaymentSuccessCard";
import SkeletonCard from "../../modules/subscription/SkeletonCard";

const SYNC_OPTIONS = [
  { days: 30, label: "1 Month" },
  { days: 180, label: "6 Months" },
  { days: 365, label: "1 Year" },
];

export default function Subscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: allPlans, loading, paymentInfo } = useSelector((s) => s.plans);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [durIdMap, setDurIdMap] = useState({});

  useEffect(() => {
    dispatch(fetchPublicPlans());
  }, [dispatch]);

  // SEO: inject page meta + JSON-LD on mount
  useEffect(() => {
    // Title & description
    const prevTitle = document.title;
    document.title = "Membership Plans — Local Trade Street";

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.content || "";
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Choose the right subscription plan for your business on Local Trade Street. Onboarding, lead generation, and premium plans available. Start free, upgrade anytime.";

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://www.localtradestreet.com/subscriptions";

    // OG tags
    const ogTags = [
      {
        property: "og:title",
        content: "Membership Plans — Local Trade Street",
      },
      {
        property: "og:description",
        content:
          "Grow your business with Local Trade Street subscription plans. Targeted leads, verified listings & more.",
      },
      {
        property: "og:url",
        content: "https://www.localtradestreet.com/subscriptions",
      },
      { property: "og:type", content: "website" },
    ];
    const addedOg = [];
    ogTags.forEach(({ property, content }) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
        addedOg.push(el);
      }
      el.setAttribute("content", content);
    });

    // JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Membership Plans — Local Trade Street",
      description:
        "Choose the right subscription plan for your local business.",
      url: "https://www.localtradestreet.com/subscriptions",
      provider: {
        "@type": "Organization",
        name: "Local Trade Street",
        url: "https://localtradestreet.com",
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "subscription-page-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDesc;
      addedOg.forEach((el) => el.remove());
      document.getElementById("subscription-page-schema")?.remove();
    };
  }, []);

  const onboardingPlans = allPlans.filter((p) => p.category === "ONBOARDING");
  const leadPlans = allPlans.filter((p) => p.category === "PLAN");
  const allSteps = [...onboardingPlans, ...leadPlans];
  const totalCards = onboardingPlans.length + leadPlans.length;

  const setDur = (planId, durId) =>
    setDurIdMap((prev) => ({ ...prev, [planId]: durId }));

  const handlePurchase = (plan, durId) => {
    setSelectedPlan(plan);
    setSelectedDuration(durId);
    setShowModal(true);
  };

  const syncAll = (days) => {
    const next = {};
    leadPlans.forEach((p) => {
      const match = (p.durations || []).find((d) => d.duration === days);
      if (match) next[p._id] = match._id;
    });
    setDurIdMap(next);
  };

  const validSync = SYNC_OPTIONS.map(({ days }) =>
    leadPlans.some((p) => (p.durations || []).some((d) => d.duration === days)),
  );

  const isSyncActive = (days) =>
    leadPlans.every((p) => {
      const match = (p.durations || []).find((d) => d.duration === days);
      if (!match) return true;
      const activeDurId = durIdMap[p._id] ?? p.durations?.[0]?._id;
      return activeDurId === match._id;
    });

  const gridCols =
    totalCards === 1
      ? "grid-cols-1 max-w-sm mx-auto"
      : totalCards === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
        : totalCards === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className="min-h-screen bg-white pb-16 sm:pb-20"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {paymentInfo && (
        <PaymentSuccessCard
          info={paymentInfo}
          onDone={() => {
            dispatch(clearPaymentInfo());
            navigate("/subscriptions");
          }}
        />
      )}

      {showModal && selectedPlan && (
        <PurchaseModal
          plan={selectedPlan}
          selectedDuration={selectedDuration}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-10 sm:py-14 md:py-16">
        {/* Back button */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="group flex items-center gap-2 w-fit text-slate-500 hover:text-slate-900 transition-colors duration-200"
          >
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-slate-400 group-hover:shadow-md transition-all duration-200">
              <ArrowLeft size={15} />
            </span>
            <span className="text-xs sm:text-sm font-medium hidden xs:block">
              Back
            </span>
          </button>
        </div>

        {/* Heading */}
        <header className="text-center mb-8 sm:mb-12" itemProp="name">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"
              aria-hidden="true"
            />
            Membership Plans
          </div>

          <h1 className="text-[clamp(28px,5vw,60px)] font-black tracking-tight leading-tight text-slate-900 mb-3 sm:mb-5 px-2">
            Choose the right plan
            <br />
            <span className="text-slate-400 font-light italic">
              for your business.
            </span>
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto px-4 leading-relaxed">
            Handpicked plans to help your business get more leads, visibility,
            and verified presence across India.
          </p>

          {/* Duration sync bar */}
          {leadPlans.length > 0 && !loading && (
            <div
              className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-3 bg-white border border-slate-200 rounded-2xl p-1 sm:p-1.5 shadow-sm mt-6 sm:mt-8"
              role="group"
              aria-label="Compare plans by duration"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 pl-2 sm:pl-3 pr-0.5 sm:pr-1 tracking-wider whitespace-nowrap">
                Compare by:
              </span>
              {SYNC_OPTIONS.map(({ days, label }, i) =>
                validSync[i] ? (
                  <button
                    key={days}
                    onClick={() => syncAll(days)}
                    aria-pressed={isSyncActive(days)}
                    aria-label={`Compare all plans for ${label}`}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-[12px] font-bold tracking-wide transition-all duration-200 ${
                      isSyncActive(days)
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {label}
                  </button>
                ) : null,
              )}
            </div>
          )}
        </header>

        {/* Steps strip */}
        {!loading && allSteps.length > 0 && (
          <nav aria-label="Subscription plan steps" className="mb-8 sm:mb-10">
            <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
              {allSteps.map((p, i) => {
                const theme = THEME[p.subCategory];
                const color =
                  p.category === "ONBOARDING"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                    : theme
                      ? `bg-gradient-to-r ${theme.color}`
                      : "bg-slate-400";
                return (
                  <div
                    key={p._id}
                    className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-50 border border-slate-200 text-[11px] sm:text-[12px] font-semibold text-slate-600 whitespace-nowrap">
                      <span
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${color} text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center flex-shrink-0`}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      {p.subCategory}
                    </div>
                    {i < allSteps.length - 1 && (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        )}

        {/* Cards */}
        {loading ? (
          <div className={`grid gap-4 sm:gap-5 ${gridCols}`}>
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : allPlans.length === 0 ? (
          <div
            className="text-center py-16 sm:py-20 text-slate-400 text-xs sm:text-sm"
            role="status"
            aria-live="polite"
          >
            No plans available right now.
          </div>
        ) : (
          <section
            aria-label="Available subscription plans"
            className={`grid gap-4 sm:gap-5 mb-10 sm:mb-12 ${gridCols}`}
          >
            {onboardingPlans.map((plan, i) => (
              <PrimeCard
                key={plan._id}
                plan={plan}
                stepNum={i + 1}
                onPurchase={handlePurchase}
              />
            ))}
            {leadPlans.map((plan, i) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                stepNum={onboardingPlans.length + i + 1}
                selectedDurId={durIdMap[plan._id] ?? plan.durations?.[0]?._id}
                onDurChange={(durId) => setDur(plan._id, durId)}
                onPurchase={handlePurchase}
              />
            ))}
          </section>
        )}

      
      </div>
    </div>
  );
}
