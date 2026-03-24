import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function PaymentSuccessMessage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const [planName, setPlanName] = useState("");

 useEffect(() => {
  if (location && location.search) {
    const params = new URLSearchParams(location.search);

    const planName = params.get("planName");
    const amount = params.get("amount");

    setPlanName(planName || "");
    setAmount(amount || 0);
  }
}, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-30" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-black text-slate-900">
          Payment Successful 🎉
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Your payment has been successfully completed and your plan is now active.
        </p>

        {/* Plan Details */}
        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase font-bold">Plan</p>
            <p className="font-extrabold text-slate-800 truncate">
              {planName || "-"}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs text-emerald-500 uppercase font-bold">
              Amount Paid
            </p>
            <p className="font-extrabold text-emerald-700">
              ₹{amount || 0}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-sm text-slate-600">
          You can now start using all premium features included in your plan.
        </div>

        {/* Action */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold flex items-center justify-center gap-2 transition"
        >
          Go to Home <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}