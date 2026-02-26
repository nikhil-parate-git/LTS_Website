import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationEdit, MapPinIcon, PhoneIcon, Share2 } from "lucide-react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
const importantLinks = [
  { label: "Login / Register", path: "/login" },
  { label: "India Directory", path: "/directory" },
  { label: "India Guide", path: "/guide" },
  { label: "Help your Community", path: "/community" },
];

const businessLinks = [
  { label: "List Your Business", path: "/list-business", highlight: false },
  { label: "Advertise With Us", path: "/advertise", highlight: false },
  { label: "Contact Us", path: "/contact", highlight: false },
  { label: "About Us", path: "/about", highlight: false },
  { 
    label: "Subscriptions and Plans", 
    path: "/subscriptions", // Change this to your actual URL if it's an external site
    highlight: false,
    isExternal: true // Custom flag to handle new tab
  },
  {
    label: "Become our Sales Partner",
    path: "/sales-partner",
    highlight: true,
  },
];

const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Infringement Policy",
];

export default function Footer() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── MAIN AREA ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* COL 1 — Important Links */}
          <div>
            <h4 className="text-gray-900 font-bold text-base mb-5">
              Important Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
                >
                  {copied ? (
                    <span className="text-green-500 font-semibold text-sm">
                      ✅ Link Copied!
                    </span>
                  ) : (
                    <>
                      {/* <span>Share</span> */}
                      {/* <Share2 className="w-3.5 h-3.5" /> */}
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 2 — Business Links */}
          <div>
            <h4 className="text-gray-900 font-bold text-base mb-5">
              Business Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className={`text-sm transition-colors duration-200 text-left ${
                      link.highlight
                        ? "text-orange-500 font-semibold hover:text-orange-600"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — CTA Card */}
          <div className="flex justify-end">
            {/* person + image */}
            {/* <div
              className="relative rounded-2xl overflow-hidden w-full max-w-[300px] shadow"
              style={{ background: "linear-gradient(135deg, #f87171 0%, #fb923c 100%)", minHeight: "148px" }}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

              
              <div
                className="absolute inset-y-0 right-0 w-[45%] opacity-25"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />

              <div className="relative z-10 p-5 pr-2 flex flex-col gap-3">
                <p className="text-white font-bold text-[14px] leading-snug">
                  Connect with Verified<br />Online Customers
                </p>
                <button
                  onClick={() => navigate("/list-business")}
                  className="bg-white text-gray-900 font-bold text-[11px] uppercase tracking-wide px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 w-fit shadow-sm"
                >
                  List Your Business for{" "}
                  <span className="bg-yellow-400 text-gray-900 px-1.5 py-0.5 rounded font-extrabold text-[10px]">
                    FREE
                  </span>
                </button>
              </div>
            </div> */}

          
{/* COL 3 — Contact Details */}
<div className="flex flex-col">
  <h4 className="text-gray-900 font-bold text-base mb-5">
    Contact
  </h4>
  <ul className="flex flex-col gap-3.5">
    {/* Phone */}
    <li>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <PhoneIcon className="w-3.5 h-3.5 text-orange-500" />
        <span>+91-070307 72573</span>
      </div>
    </li>

    {/* Email */}
    <li>
      <a 
        href="mailto:support@technoro.in"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        <EnvelopeIcon className="w-3.5 h-3.5 text-orange-500" />
        <span>support@technoro.in</span>
      </a>
    </li>

    {/* Location */}
    <li>
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <MapPinIcon className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
        <span className="leading-snug">
          4th floor, Prince Complex, <br />
          Chatrapati Nagar, Nagpur, <br />
          Maharastra 440025
        </span>
      </div>
    </li>
  </ul>
</div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
        <div style={{ borderTop: "1px solid #e5e7eb" }} >
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row justify-center  gap-3">
            {/* Left — copyright + legal */}
            <div className="flex flex-col gap-1.5 ">
              <p className="text-gray-600 text-xs">
                Design and developed by Telentrise Technokrate Pvt.Ltd <br />
                Copyright@ Local Trade Street
              </p>
              {/* <div className="flex flex-wrap gap-1 items-center">
                {legalLinks.map((l, i) => (
                  <span key={l} className="flex items-center gap-1">
                    <button className="text-gray-500 hover:text-orange-500 text-xs transition-colors duration-200">
                      {l}
                    </button>
                    {i < legalLinks.length - 1 && (
                      <span className="text-gray-300 text-xs"> </span>
                    )}
                  </span>
                ))}
              </div> */}
            </div>

            {/* Right — disclaimer italic */}
            {/* <p className="text-gray-400 text-[11px] leading-relaxed max-w-lg italic text-left md:text-right">
              Third-party brand trademarks and logos appearing here are owned by
              the respective third parties and are not affiliated with
              localtradestreet.in. View our complete{" "}
              <button className="text-gray-600 not-italic font-semibold underline underline-offset-2 hover:text-orange-500 transition-colors">
                Disclaimer
              </button>
              .
            </p> */}
          </div>
        </div>
    </footer>
  );
}
