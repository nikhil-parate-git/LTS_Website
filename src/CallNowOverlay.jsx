import { Phone } from "lucide-react";
import React from "react";
 
const CallNowOverlay = () => {
  return (
    <div className="fixed bottom-3 md:bottom-8 left-5 md:left-10 z-50 ">
      <div
        className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 
                   p-1 rounded-full backdrop-blur-xl shadow-lg shadow-orange-400"
        style={{
          animation: "heartbeat 5s ease-in-out infinite",
        }}
      >
        {/* Call Link */}
        <a href="tel:07030772573" aria-label="Call now">
          <button aria-label="Call now"
            className="text-xs md:text-sm bg-gradient-to-tl from-orange-400 via-orange-500 to-orange-700 
                       text-white px-2 py-2 md:px-2 md:py-2 rounded-full shadow-lg font-medium 
                       hover:from-orange-500 hover:to-orange-600 focus:outline-none"
          >
            {/* Mobile Icon */}
            <Phone className="block w-5 h-5" />
 
            {/* Desktop Text */}
            {/* <span className="hidden md:block text-xl">
              <Phone className="block w-5 h-5" />
            </span> */}
          </button>
          
        </a>
        
      </div>
 
      {/* inline keyframes */}
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            20% { transform: scale(1.12); }
            40% { transform: scale(1); }
            60% { transform: scale(1.12); }
            80% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};
 
export default CallNowOverlay;