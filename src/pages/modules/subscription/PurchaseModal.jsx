import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { guestPurchasePlan } from "../../../redux/slice/plansSlice";
import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
import { fmt, convertDaysToLabel } from "../../../utils/subscriptionHelpers";

export default function PurchaseModal({ plan, selectedDuration, onClose }) {
  const dispatch          = useDispatch();
  const { purchasing, purchaseError } = useSelector((s) => s.plans);
  const serviceCategories = useSelector((s) => s.categories.categories);
  const categoriesLoading = useSelector((s) => s.categories.loading);

  useEffect(() => {
    if (!serviceCategories.length) dispatch(fetchAllCategories());
  }, []);

  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "", companyName: "", serviceCategory: "",
  });
  const [errors, setErrors] = useState({});

  // Find the selected duration entry to get totalPayable
  // durations are now objects: { duration, price, gst, totalPayable, ... }
  const durationEntry = (plan.durations || []).find(
    (d) => d.duration === Number(selectedDuration)
  );
  const total = durationEntry?.totalPayable ?? 0;

  const validate = () => {
    const e = {};
    if (!form.name.trim())                          e.name     = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone))            e.phone    = "Enter valid 10-digit phone";
    if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch(guestPurchasePlan({
      planId: plan._id,
      selectedDuration,
      ...form,
    })).unwrap().then(() => onClose()).catch(() => {});
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(ev) => setForm((p) => ({ ...p, [key]: ev.target.value }))}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors[key] ? "border-red-400" : "border-slate-200"}`}
      />
      {errors[key] && <span className="text-[11px] text-red-500">{errors[key]}</span>}
    </div>
  );

  const theme = THEME[plan.subCategory] || DEFAULT_THEME;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden my-auto">
        <div className={`h-1.5 bg-gradient-to-r ${theme.color}`} />
        <div className="p-6">

          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Register</p>
              <h3 className="text-xl font-extrabold text-slate-800">
                {plan.category} – {plan.subCategory}
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {convertDaysToLabel(selectedDuration)} · ₹{fmt(total)}
              </p>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition text-lg leading-none">
              ×
            </button>
          </div>

          {purchaseError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {purchaseError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {field("name",        "Full Name",              "text",     "Your full name")}
            {field("phone",       "Phone Number",           "tel",      "10-digit mobile")}
            {field("email",       "Email (optional)",       "email",    "you@example.com")}
            {field("password",    "Password",               "password", "Min 6 characters")}
            {field("companyName", "Company Name (optional)","text",     "Your business name")}

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Service Category (optional)
              </label>
              <select
                value={form.serviceCategory}
                onChange={(ev) => setForm((p) => ({ ...p, serviceCategory: ev.target.value }))}
                disabled={categoriesLoading}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-slate-700 disabled:opacity-60"
              >
                <option value="">
                  {categoriesLoading ? "Loading…" : "Select a category"}
                </option>
                {(serviceCategories || []).map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={purchasing}
              className={`mt-2 w-full py-3.5 rounded-xl text-sm font-extrabold tracking-widest uppercase text-white transition flex items-center justify-center gap-2 ${theme.btn} disabled:opacity-60`}>
              {purchasing
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                : "Continue to Payment →"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}