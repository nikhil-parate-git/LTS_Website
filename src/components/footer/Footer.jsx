import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "../../assets/logo.png";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Submit Enquiry", path: "/submitenquiry" },
  { label: "SubScriptions And Plans", path: "/subscriptions" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#1a2332]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ── MAIN AREA ── */}
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* COL 1 — Logo + Description */}
          <div className="flex flex-col items-center sm:items-start gap-4">
            <img src={logo} alt="Local Trade Street" className="h-12 w-auto object-contain" />
            <p className="text-white text-sm leading-relaxed text-center sm:text-left">
              Local Trade Street Provides Leads to customer which are in search of local work in their nearby areas.
            </p>
          </div>

          {/* COL 2 — Explore */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
              Explore
            </h4>
            <ul className="flex  flex-col items-center sm:items-start gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-white cursor-pointer text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Contact Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-white text-sm">+91-070307 72573</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-orange-400" />
                </div>
                <a
                  href="mailto:support@localtradestreet.com"
                  className="text-white text-sm hover:text-orange-400 transition-colors duration-200 break-all"
                >
                  support@localtradestreet.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-white text-sm leading-relaxed">
                  4th floor, Prince Complex,<br />
                  Chatrapati Nagar, Nagpur,<br />
                  Maharashtra 440025
                </span>
              </li>
            </ul>
          </div>

          {/* COL 4 — Follow Us */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#1877f2] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-[#2d3f55]">
        <div className="w-full px-6 py-4 text-center">
          <p className="text-white text-xs">
            Copyright © 2026 Local Trade Street. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}