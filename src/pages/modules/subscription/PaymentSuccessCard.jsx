import React, { useState } from "react";
import { Copy, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { fmt } from "../../../utils/subscriptionHelpers";

export default function PaymentSuccessCard({ info, onDone }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(info.paymentLink);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400" />
        <div className="p-6 flex flex-col gap-4">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Payment Link Ready!</h3>
              <p className="text-sm text-slate-500">Complete payment to activate your account & plan.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
            <span className="flex-1 text-xs font-mono text-slate-700 break-all">{info.paymentLink}</span>
            <button onClick={copy}
              className="flex-shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 hover:border-slate-400 transition">
              <Copy className="w-3.5 h-3.5" />{copied ? "Copied!" : "Copy"}
            </button>
            <a href={info.paymentLink} target="_blank" rel="noreferrer"
              className="flex-shrink-0 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-emerald-600 transition">
              <ExternalLink className="w-3.5 h-3.5" /> Pay Now
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-0.5">Plan</p>
              <p className="font-bold text-slate-800">{info.planName}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-400 font-semibold mb-0.5">Total</p>
              <p className="font-bold text-slate-800">₹{fmt(info.amount)}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-700">
            ℹ Your vendor account and plan will be activated automatically after payment.
          </div>

          <button onClick={onDone}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}