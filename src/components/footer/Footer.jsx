// import { useNavigate } from "react-router-dom";
// import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
// import logo from "../../assets/logo.png";

// const exploreLinks = [
//   { label: "Home", path: "/" },
//   { label: "About Us", path: "/about" },
//   { label: "Contact Us", path: "/contact" },
//   { label: "Submit Enquiry", path: "/submitenquiry" },
//   { label: "SubScriptions And Plans", path: "/subscriptions" },
// ];

// export default function Footer() {
//   const navigate = useNavigate();

//   return (
//     <footer className="w-full bg-[#1a2332]" style={{ fontFamily: "'Poppins', sans-serif" }}>
//       <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

//       {/* ── MAIN AREA ── */}
//       <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 py-14">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

//           {/* COL 1 — Logo + Description */}
//           <div className="flex flex-col items-center sm:items-start gap-4">
//             <img src={logo} alt="Local Trade Street" className="h-12 w-auto object-contain" />
//             <p className="text-white text-sm leading-relaxed text-center sm:text-left">
//               Local Trade Street Provides Leads to customer which are in search of local work in their nearby areas.
//             </p>
//           </div>

//           {/* COL 2 — Explore */}
//           <div className="flex flex-col items-center sm:items-start">
//             <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
//               Explore
//             </h4>
//             <ul className="flex  flex-col items-center sm:items-start gap-3">
//               {exploreLinks.map((link) => (
//                 <li key={link.label}>
//                   <button
//                     onClick={() => navigate(link.path)}
//                     className="text-white cursor-pointer text-sm hover:text-orange-400 transition-colors duration-200"
//                   >
//                     {link.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* COL 3 — Contact Us */}
//           <div className="flex flex-col items-center sm:items-start">
//             <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
//               Contact Us
//             </h4>
//             <ul className="flex flex-col gap-4">
//               <li className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0">
//                   <Phone className="w-4 h-4 text-orange-400" />
//                 </div>
//                 <span className="text-white text-sm">+91-070307 72573</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0">
//                   <Mail className="w-4 h-4 text-orange-400" />
//                 </div>
//                 <a
//                   href="mailto:support@localtradestreet.com"
//                   className="text-white text-sm hover:text-orange-400 transition-colors duration-200 break-all"
//                 >
//                   support@localtradestreet.com
//                 </a>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="w-9 h-9 rounded-full bg-[#243650] flex items-center justify-center shrink-0 mt-0.5">
//                   <MapPin className="w-4 h-4 text-orange-400" />
//                 </div>
//                 <span className="text-white text-sm leading-relaxed">
//                   4th floor, Prince Complex,<br />
//                   Chatrapati Nagar, Nagpur,<br />
//                   Maharashtra 440025
//                 </span>
//               </li>
//             </ul>
//           </div>

//           {/* COL 4 — Follow Us */}
//           <div className="flex flex-col items-center sm:items-start">
//             <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 pb-2 border-b-2 border-orange-500 w-full text-center sm:text-left">
//               Follow Us
//             </h4>
//             <div className="flex gap-3">
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-11 h-11 rounded-xl bg-[#1877f2] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
//               >
//                 <Facebook className="w-5 h-5 text-white" />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-11 h-11 rounded-xl flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
//                 style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
//               >
//                 <Instagram className="w-5 h-5 text-white" />
//               </a>
//               <a
//                 href="https://youtube.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
//               >
//                 <Youtube className="w-5 h-5 text-white" />
//               </a>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── BOTTOM BAR ── */}
//       <div className="border-t border-[#2d3f55]">
//         <div className="w-full px-6 py-4 text-center">
//           <p className="text-white text-xs">
//             Copyright © 2026 Local Trade Street. All Rights Reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "../../assets/logo.png";

const exploreLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Submit Enquiry", path: "/submitenquiry" },
  { label: "SubScriptions And Plans", path: "/subscriptions" },
];

// WhatsApp SVG icon (lucide doesn't have it)
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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
            <ul className="flex flex-col items-center sm:items-start gap-3">
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
            <div className="flex flex-wrap gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#1877f2] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917030772573"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#25d366] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <WhatsAppIcon size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-[#0a66c2] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <Linkedin className="w-5 h-5 text-white" />
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