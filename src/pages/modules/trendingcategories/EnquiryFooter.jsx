import { useState, useEffect, useRef } from "react";
import { Phone, Share2, Send, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StickyFooter({
  businessName = "Business Name",
  location = "Delhi",
  rating = 5.0,

}) {
  const [visible, setVisible] = useState(false);
  const [showNum, setShowNum] = useState(false);
  const lastScrollY = useRef(0);
  const navigate=useNavigate()

  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScrollY.current && curr > 150) setVisible(true);
      else if (curr < lastScrollY.current) setVisible(false);
      lastScrollY.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes sfPulse {
          0%   { opacity: 0.9; transform: scale(1); }
          80%  { opacity: 0; transform: scale(1.35); }
          100% { opacity: 0; }
        }
        @keyframes sfBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        .sf-pulse-ring {
          position: absolute; inset: -3px; border-radius: 14px;
          border: 1.5px solid rgba(59,130,246,0.55);
          animation: sfPulse 2s ease-out infinite;
        }
        .sf-live-dot {
          width: 7px; height: 7px; border-radius: 9999px;
          background: #4ade80; flex-shrink: 0;
          animation: sfBlink 1.5s ease-in-out infinite;
        }
        .sf-glow-line {
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #f97316 30%, #fb923c 50%, #f97316 70%, transparent);
          opacity: 0.75;
        }
      `}</style>

      {/* Wrapper — slides in/out */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-[400ms]"
        style={{
          transform: visible ? "translateY(0)" : "translateY(110%)",
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Bar */}
        <div
          className="relative flex items-center justify-between gap-3 px-5 py-3.5 flex-wrap"
          style={{
            background: "linear-gradient(120deg,#0f0f18 0%,#1a1025 50%,#0f0f18 100%)",
            borderTop: "1px solid rgba(249,115,22,0.22)",
            boxShadow: "0 -2px 0 rgba(249,115,22,0.12), 0 -16px 48px rgba(0,0,0,0.55)",
          }}
        >
          {/* Orange glow top line */}
          <div className="sf-glow-line" />

          {/* ── LEFT — Business Info ── */}
          <div className="flex flex-col min-w-0">
            <span
              className="text-white font-extrabold tracking-tight truncate max-w-[190px] sm:max-w-xs"
              style={{ fontSize: "25px", letterSpacing: "-0.3px" }}
            >
              {businessName}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-white/40 text-xs">
                <MapPin size={11} />
                {location}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star size={11} fill="#fbbf24" stroke="none" />
                {rating}
              </span>
            </div>
          </div>

          {/* Vertical divider — hidden on mobile */}
          <div className="hidden sm:block w-px h-10 bg-white/10 flex-shrink-0" />

          {/* ── RIGHT — Action Buttons ── */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">

            {/* Show Number / Number chip toggle */}
            {showNum ? (
              <button
                onClick={() => setShowNum(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-bold text-emerald-400 border border-emerald-400/25 transition-colors hover:bg-emerald-400/15 whitespace-nowrap"
                style={{ background: "rgba(74,222,128,0.08)" }}
              >
                <span className="sf-live-dot" />
                +91 99900 22994
              </button>
            ) : (
              <button
                onClick={() => setShowNum(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white border-none whitespace-nowrap transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                  boxShadow: "0 4px 18px rgba(59,130,246,0.4)",
                }}
              >
                <div className="sf-pulse-ring" />
                <span className="sf-live-dot" />
                <Phone size={14} />
                Show Number
              </button>
            )}

            {/* Share */}
            <button
              onClick={() => navigator.share?.({ title: businessName, url: window.location.href })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white/75 border border-white/10 whitespace-nowrap transition-all duration-150 hover:bg-white/10 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <Share2 size={14} />
              Share
            </button>

            {/* Send Enquiry */}
            <button
              onClick={()=>navigate("/submitenquiry")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white border-none whitespace-nowrap transition-all duration-150 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#c2410c,#f97316)",
                boxShadow: "0 4px 18px rgba(249,115,22,0.35)",
              }}
            >
              <Send size={14} />
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}