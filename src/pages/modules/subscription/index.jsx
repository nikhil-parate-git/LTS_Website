import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchPublicPlans, clearPaymentInfo } from "../../../redux/slice/plansSlice";
import { THEME } from "../../../constants/subscriptionThemes";
import PrimeCard          from "../../modules/subscription/PrimeCard";
import PlanCard           from "../../modules/subscription/PlanCard";
import PurchaseModal      from "../../modules/subscription/PurchaseModal";
import PaymentSuccessCard from "../../modules/subscription/PaymentSuccessCard";
import SkeletonCard       from "../../modules/subscription/SkeletonCard";

// Duration options matching model enum: [30, 180, 365, 730]
const SYNC_OPTIONS = [
  { days: 30,  label: "1 Month"  },
  { days: 90,  label: "3 Months" },
  { days: 180, label: "6 Months" },
  { days: 365, label: "1 Year"   },
];

export default function Subscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: allPlans, loading, paymentInfo } = useSelector((s) => s.plans);

  const [showModal,        setShowModal]        = useState(false);
  const [selectedPlan,     setSelectedPlan]     = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [durIdxMap,        setDurIdxMap]        = useState({});

  useEffect(() => { dispatch(fetchPublicPlans()); }, [dispatch]);

  const onboardingPlans = allPlans.filter((p) => p.category === "ONBOARDING");
  const leadPlans       = allPlans.filter((p) => p.category === "PLAN");
  const allSteps        = [...onboardingPlans, ...leadPlans];

  const setDur = (planId, idx) =>
    setDurIdxMap((prev) => ({ ...prev, [planId]: idx }));

  const handlePurchase = (plan, duration) => {
    setSelectedPlan(plan);
    setSelectedDuration(duration);
    setShowModal(true);
  };

  /**
   * Sync all lead plan cards to a given duration (by days value).
   * durations are now objects: { duration, price, gst, ... }
   * Find the index of the matching duration object.
   */
  const syncAll = (days) => {
    const next = {};
    leadPlans.forEach((p) => {
      const idx = (p.durations || []).findIndex((d) => d.duration === days);
      if (idx !== -1) next[p._id] = idx;
    });
    setDurIdxMap(next);
  };

  /** Which sync buttons are valid — at least one lead plan has that duration */
  const validSync = SYNC_OPTIONS.map(({ days }) =>
    leadPlans.some((p) => (p.durations || []).some((d) => d.duration === days))
  );

  /** Check if all lead plans are currently showing a given duration */
  const isSyncActive = (days) =>
    leadPlans.every((p) => {
      const idx = (p.durations || []).findIndex((d) => d.duration === days);
      return idx === -1 || (durIdxMap[p._id] ?? 0) === idx;
    });

  return (
    <div className="min-h-screen bg-white pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {paymentInfo && (
        <PaymentSuccessCard
          info={paymentInfo}
          onDone={() => { dispatch(clearPaymentInfo()); navigate("/subscriptions"); }}
        />
      )}

      {showModal && selectedPlan && (
        <PurchaseModal
          plan={selectedPlan}
          selectedDuration={selectedDuration}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-5 py-16">

        {/* Back */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)}
            className="group flex items-center gap-2 w-fit text-slate-500 hover:text-slate-900 transition-colors duration-200">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white shadow-sm group-hover:border-slate-400 group-hover:shadow-md transition-all duration-200">
              <ArrowLeft size={16} />
            </span>
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Membership Plans
          </div>
          <h1 className="text-[clamp(36px,5vw,60px)] font-black tracking-tight leading-tight text-slate-900 mb-5">
            Choose the right plan
            <br />
            <span className="text-slate-400 font-light italic">for your business.</span>
          </h1>

          {/* Duration sync bar */}
          {leadPlans.length > 0 && !loading && (
            <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm mt-8">
              <span className="text-[11px] font-semibold text-slate-400 pl-3 pr-1 tracking-wider">
                Compare plans by:
              </span>
              {SYNC_OPTIONS.map(({ days, label }, i) =>
                validSync[i] ? (
                  <button key={days} onClick={() => syncAll(days)}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold tracking-wide transition-all duration-200 ${
                      isSyncActive(days)
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}>
                    {label}
                  </button>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Steps strip */}
        {!loading && allSteps.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto py-2">
            {allSteps.map((p, i) => {
              const theme  = THEME[p.subCategory];
              const color  = p.category === "ONBOARDING"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                : theme
                  ? `bg-gradient-to-r ${theme.color}`
                  : "bg-slate-400";
              return (
                <div key={p._id} className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[12px] font-semibold text-slate-600">
                    <span className={`w-5 h-5 rounded-full ${color} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0`}>
                      {i + 1}
                    </span>
                    {p.subCategory}
                  </div>
                  {i < allSteps.length - 1 && (
                    <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : allPlans.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-sm">No plans available right now.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {onboardingPlans.map((plan, i) => (
              <PrimeCard key={plan._id} plan={plan} stepNum={i + 1} onPurchase={handlePurchase} />
            ))}
            {leadPlans.map((plan, i) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                stepNum={onboardingPlans.length + i + 1}
                durIdx={durIdxMap[plan._id] ?? 0}
                onDurChange={(idx) => setDur(plan._id, idx)}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}