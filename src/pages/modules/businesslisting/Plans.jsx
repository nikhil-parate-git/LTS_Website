import React from "react";

const features = [
  { label: "Service Guarantee", free: null, premium: "Pay 50% now,50% later" },
  { label: "Verified customer enquiry", free: null, premium: true },
  { label: "Listing position", free: "After Featured", premium: "TOP" },
  { label: "Free Banner Advertisement Promotion", free: null, premium: true },
  { label: "Google Optimized Business Profile", free: null, premium: true },
  { label: "Business Categories", free: "Limited", premium: "3x" },
  { label: "Premium Business Seal", free: null, premium: true },
  { label: "Visibility", free: "Basic", premium: "10x" },
  { label: "Customer Reach", free: "Limited", premium: "10x" },
  { label: "Enquiries In Whatsapp", free: "Limited", premium: "UNLIMITED" },
  {
    label: "Enquiries through SMS & Call",
    free: "Limited",
    premium: "UNLIMITED",
  },
  { label: "Add Products/Service", free: "Limited", premium: "UNLIMITED" },
  { label: "Add Photos", free: "Limited", premium: "UNLIMITED" },
  { label: "Smart Enquiry Delivery System", free: null, premium: true },
  { label: "Performance Analytics & Stats", free: true, premium: true },
  { label: "Lead Management System", free: true, premium: true },
  { label: "Premium Customer Support", free: null, premium: true },
];

const Cross = () => (
  <svg
    className="mx-auto"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Check = () => (
  <svg
    className="mx-auto"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const InfoIcon = () => (
  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-700 text-white text-[9px] font-bold ml-1 cursor-pointer flex-shrink-0">
    i
  </span>
);

const FeatureIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f97316"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0 mt-0.5"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

function CellValue({ value, isPremium }) {
  if (value === null || value === false) return <Cross />;
  if (value === true) return <Check />;
  return (
    <span
      className={`text-xs font-semibold ${isPremium ? "text-blue-700" : "text-gray-600"}`}
    >
      {value}
    </span>
  );
}

const Plans = () => {
  return (
    <div className="min-h-screen  flex items-start justify-center py-2 mb-6 px-4">
      <div className="w-full">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Select a Plan</h2>
          <p className="text-base text-gray-500 mt-1">
            Create Your Listing and Start Growing Your Business Online
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl overflow-x-auto shadow-sm border border-gray-200">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr>
                {/* Feature col header */}
                <th className="bg-gray-50 w-1/2 px-4 py-4 text-left border-b border-r border-gray-200" />

                {/* FREE */}
                <th className="bg-gray-50 px-4 py-4 text-center border-b border-r border-gray-200">
                  <div className="text-xs font-bold tracking-widest text-gray-700 mb-2">
                    FREE
                  </div>
                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors">
                    Select
                  </button>
                </th>

                {/* PREMIUM */}
                <th className="bg-gray-50 px-4 py-4 text-center border-b border-gray-200">
                  <div className="text-xs font-bold tracking-widest text-blue-800 mb-2">
                    PREMIUM
                  </div>
                  <button className="w-full bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors">
                    Select
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {features.map((f, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-50 transition-colors`}
                >
                  {/* Feature label */}
                  <td className="px-4 py-2.5 border-r border-gray-100">
                    <div className="flex items-start gap-2">
                      <FeatureIcon />
                      <span className="text-xs text-gray-700 leading-snug">
                        {f.label}
                      </span>
                      <InfoIcon />
                    </div>
                  </td>

                  {/* FREE value */}
                  <td className="px-3 py-2.5 text-center border-r border-gray-100">
                    <CellValue value={f.free} isPremium={false} />
                  </td>

                  {/* PREMIUM value */}
                  <td className="px-3 py-2.5 text-center">
                    <CellValue value={f.premium} isPremium={true} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Plans;
