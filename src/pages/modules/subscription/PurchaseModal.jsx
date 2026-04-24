// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Loader2 } from "lucide-react";
// import { guestPurchasePlan } from "../../../redux/slice/plansSlice";
// import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
// import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
// import { fmt, convertDaysToLabel } from "../../../utils/subscriptionHelpers";

// export default function PurchaseModal({ plan, selectedDuration, onClose }) {
//   // selectedDuration is now a duration _id (string)
//   const dispatch          = useDispatch();
//   const { purchasing, purchaseError } = useSelector((s) => s.plans);
//   const serviceCategories = useSelector((s) => s.categories.categories);
//   const categoriesLoading = useSelector((s) => s.categories.loading);

//   useEffect(() => {
//     if (!serviceCategories.length) dispatch(fetchAllCategories());
//   }, []);

//   const [form, setForm] = useState({
//     name: "", phone: "", email: "", password: "", companyName: "", serviceCategory: "",
//   });
//   const [errors, setErrors] = useState({});

//   // Find duration entry by _id
//   const durationEntry = (plan.durations || []).find((d) => d._id === selectedDuration);
//   const total = durationEntry?.totalPayable ?? 0;

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim())                          e.name     = "Name is required";
//     if (!/^[0-9]{10}$/.test(form.phone))            e.phone    = "Enter valid 10-digit phone";
//     if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
//     return e;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     dispatch(guestPurchasePlan({
//       planId:             plan._id,
//       selectedDurationId: selectedDuration,   // send _id to backend
//       ...form,
//     })).unwrap().then(() => onClose()).catch(() => {});
//   };

//   const field = (key, label, type = "text", placeholder = "") => (
//     <div className="flex flex-col gap-1">
//       <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         value={form[key]}
//         onChange={(ev) => setForm((p) => ({ ...p, [key]: ev.target.value }))}
//         className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors[key] ? "border-red-400" : "border-slate-200"}`}
//       />
//       {errors[key] && <span className="text-[11px] text-red-500">{errors[key]}</span>}
//     </div>
//   );

//   const theme = THEME[plan.subCategory] || DEFAULT_THEME;

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden my-auto">
//         <div className={`h-1.5 bg-gradient-to-r ${theme.color}`} />
//         <div className="p-6">

//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Register</p>
//               <h3 className="text-xl font-extrabold text-slate-800">
//                 {plan.category} – {plan.subCategory}
//               </h3>
//               <p className="text-sm text-slate-500 mt-0.5">
//                 {convertDaysToLabel(durationEntry?.duration)} · ₹{fmt(total)}
//               </p>
//             </div>
//             <button onClick={onClose}
//               className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-400 transition text-lg leading-none">
//               ×
//             </button>
//           </div>

//           {purchaseError && (
//             <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
//               {purchaseError}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
//             {field("name",        "Full Name",               "text",     "Your full name")}
//             {field("phone",       "Phone Number",            "tel",      "10-digit mobile")}
//             {field("email",       "Email (optional)",        "email",    "you@example.com")}
//             {field("password",    "Password",                "password", "Min 6 characters")}
//             {field("companyName", "Company Name (optional)", "text",     "Your business name")}

//             <div className="flex flex-col gap-1">
//               <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
//                 Service Category (optional)
//               </label>
//               <select
//                 value={form.serviceCategory}
//                 onChange={(ev) => setForm((p) => ({ ...p, serviceCategory: ev.target.value }))}
//                 disabled={categoriesLoading}
//                 className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-slate-700 disabled:opacity-60"
//               >
//                 <option value="">
//                   {categoriesLoading ? "Loading…" : "Select a category"}
//                 </option>
//                 {(serviceCategories || []).map((cat) => (
//                   <option key={cat.id} value={cat.id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>

//             <button type="submit" disabled={purchasing}
//               className={`mt-2 w-full py-3.5 rounded-xl text-sm font-extrabold tracking-widest uppercase text-white transition flex items-center justify-center gap-2 ${theme.btn} disabled:opacity-60`}>
//               {purchasing
//                 ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
//                 : "Continue to Payment →"
//               }
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { guestPurchasePlan } from "../../../redux/slice/plansSlice";
import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import { THEME, DEFAULT_THEME } from "../../../constants/subscriptionThemes";
import { fmt, convertDaysToLabel } from "../../../utils/subscriptionHelpers";

export default function PurchaseModal({ plan, selectedDuration, onClose }) {
  const dispatch = useDispatch();
  const { purchasing, purchaseError } = useSelector((s) => s.plans);
  const serviceCategories = useSelector((s) => s.categories.categories);
  const categoriesLoading = useSelector((s) => s.categories.loading);

  useEffect(() => {
    if (!serviceCategories.length) dispatch(fetchAllCategories());
  }, []);

  const durationEntry = (plan.durations || []).find(
    (d) => d._id === selectedDuration,
  );
  const total = durationEntry?.totalPayable ?? 0;

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Offer",
      name: `${plan.category} – ${plan.subCategory} Plan`,
      description: `Subscribe to ${plan.subCategory} plan on Local Trade Street. Duration: ${convertDaysToLabel(durationEntry?.duration)}. Total payable: ₹${fmt(total)}.`,
      price: total,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Local Trade Street",
        url: "https://localtradestreet.com",
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "purchase-modal-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById("purchase-modal-schema")?.remove();
    };
  }, [plan, selectedDuration]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    serviceCategory: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    if (!form.password || form.password.length < 6)
      e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    dispatch(
      guestPurchasePlan({
        planId: plan._id,
        selectedDurationId: selectedDuration,
        ...form,
      }),
    )
      .unwrap()
      .then(() => onClose())
      .catch(() => {});
  };

  const field = (
    key,
    label,
    type = "text",
    placeholder = "",
    required = false,
  ) => (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={`purchase-${key}`}
        className="text-[10px] font-semibold uppercase tracking-widest text-slate-500"
      >
        {label}
        {required && (
          <span className="text-red-400 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={`purchase-${key}`}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        autoComplete={
          key === "email"
            ? "email"
            : key === "phone"
              ? "tel"
              : key === "password"
                ? "new-password"
                : key === "name"
                  ? "name"
                  : "off"
        }
        aria-required={required}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `purchase-${key}-error` : undefined}
        onChange={(ev) => setForm((p) => ({ ...p, [key]: ev.target.value }))}
        style={{ fontSize: "16px" }}
        className={`w-full px-3.5 py-3 rounded-xl border text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${
          errors[key]
            ? "border-red-400 bg-red-50"
            : "border-slate-200 focus:border-blue-300"
        }`}
      />
      {errors[key] && (
        <span
          id={`purchase-${key}-error`}
          className="text-[11px] text-red-500"
          role="alert"
        >
          {errors[key]}
        </span>
      )}
    </div>
  );

  const theme = THEME[plan.subCategory] || DEFAULT_THEME;

  return (
    // Overlay
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Purchase ${plan.category} – ${plan.subCategory} plan`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      {/* Modal sheet */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "448px",
          borderRadius: "20px 20px 0 0",
          display: "flex",
          flexDirection: "column",
          // Key fix: use window.innerHeight so it works on all mobile browsers
          maxHeight: "92vh",
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
            paddingBottom: "4px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              backgroundColor: "#e2e8f0",
              borderRadius: "9999px",
            }}
          />
        </div>

        {/* Gradient bar */}
        <div
          style={{ height: "4px", flexShrink: 0 }}
          className={`bg-gradient-to-r ${theme.color} w-full`}
        />

        {/* Scrollable area — THIS is the key fix */}
        <div
          style={{
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            flex: 1,
            padding: "20px 20px 32px 20px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                  marginBottom: "2px",
                }}
              >
                Quick Register
              </p>
              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#1e293b",
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {plan.category} – {plan.subCategory}
              </h2>
              <p
                style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}
              >
                {convertDaysToLabel(durationEntry?.duration)} ·{" "}
                <strong style={{ color: "#1e293b" }}>₹{fmt(total)}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close purchase modal"
              style={{
                width: "36px",
                height: "36px",
                flexShrink: 0,
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#94a3b8",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Error banner */}
          {purchaseError && (
            <div
              role="alert"
              aria-live="polite"
              style={{
                marginBottom: "16px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "12px",
                borderRadius: "12px",
                padding: "12px 16px",
                lineHeight: 1.5,
              }}
            >
              {purchaseError}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Business registration form"
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {field("name", "Full Name", "text", "Your full name", true)}
            {field("phone", "Phone Number", "tel", "10-digit mobile", true)}
            {field("email", "Email (optional)", "email", "you@example.com")}
            {field(
              "password",
              "Password",
              "password",
              "Min 6 characters",
              true,
            )}
            {field(
              "companyName",
              "Company Name (optional)",
              "text",
              "Your business name",
            )}

            {/* Category select */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <label
                htmlFor="purchase-serviceCategory"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Service Category (optional)
              </label>
              <select
                id="purchase-serviceCategory"
                value={form.serviceCategory}
                onChange={(ev) =>
                  setForm((p) => ({ ...p, serviceCategory: ev.target.value }))
                }
                disabled={categoriesLoading}
                aria-label="Select your service category"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px",
                  backgroundColor: "#f8fafc",
                  color: "#334155",
                  outline: "none",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="">
                  {categoriesLoading ? "Loading…" : "Select a category"}
                </option>
                {(serviceCategories || []).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Total summary */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "12px 16px",
                marginTop: "4px",
              }}
            >
              <span
                style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}
              >
                Total Payable
              </span>
              <span
                style={{ fontSize: "15px", fontWeight: 800, color: "#1e293b" }}
              >
                ₹{fmt(total)}
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={purchasing}
              aria-label={`Complete purchase of ${plan.subCategory} plan for ₹${fmt(total)}`}
              style={{ marginTop: "4px" }}
              className={`w-full py-4 rounded-xl text-sm font-extrabold tracking-widest uppercase text-white transition-all flex items-center justify-center gap-2 ${theme.btn} disabled:opacity-60 shadow-lg active:scale-95`}
            >
              {purchasing ? (
                <>
                  <Loader2
                    className="w-4 h-4 animate-spin"
                    aria-hidden="true"
                  />
                  Processing…
                </>
              ) : (
                "Continue to Payment →"
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#94a3b8",
                marginTop: "4px",
              }}
            >
              🔒 Secure & encrypted payment. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
