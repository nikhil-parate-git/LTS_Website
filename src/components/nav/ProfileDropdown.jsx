import React, { useEffect, useState } from "react";
import { Users, Share2, LogOut, ChevronLeft, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slice/profile/getProfile";
import { Link } from "react-router-dom"; // SEO aur Navigation ke liye

const ProfileDropdown = ({ onClose, onLogout }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profile);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Sirf tabhi fetch karein jab data na ho (Performance Optimization)
    dispatch(fetchProfile());

    // Cleanup logic agar user fast click karke unmount kar de
    return () => setIsExiting(false);
  }, [dispatch]);

  const handleSmoothClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 280); // CSS animation se thoda kam rakha hai smooth feel ke liye
  };

  const userName = data?.name || "User";
  const userPhone = data?.phone || "No phone linked";

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end md:pt-16 pointer-events-none"
      role="dialog" // Accessibility: Google ko pata chalega ye ek popup/modal hai
      aria-modal="true"
    >
      {/* Overlay - Mobile view ke liye clickable background */}
      <div
        className={`absolute inset-0 bg-black/30 md:hidden pointer-events-auto transition-opacity duration-300 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleSmoothClose}
      />

      <aside // Semantic HTML: isse SEO improve hota hai
        className="relative w-full h-full md:h-auto md:w-80 bg-white shadow-2xl md:rounded-l-2xl overflow-hidden pointer-events-auto flex flex-col border-l border-gray-100"
        style={{
          animation: isExiting
            ? "slideOutRight 0.3s ease-in forwards"
            : "slideInRight 0.3s ease-out forwards",
        }}
      >
        {/* Header Section */}
        <div className="p-6 flex items-start justify-between bg-gradient-to-b from-orange-50/50 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-600 border-2 border-white shadow-sm">
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">
                Account
              </p>
              <h3 className="text-lg font-bold text-gray-900 truncate w-40">
                {userName}
              </h3>
              <p className="text-xs text-gray-500 font-medium">{userPhone}</p>
            </div>
          </div>

          <button
            onClick={handleSmoothClose}
            aria-label="Close Profile"
            className="p-1.5 hover:bg-white hover:shadow-md rounded-full transition-all active:scale-90 border border-transparent hover:border-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Menu Options */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 rounded-xl transition-colors group">
            <Users className="w-5 h-5 text-gray-500 group-hover:text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">
              Community Help
            </span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50/50 rounded-xl transition-colors group">
            <Share2 className="w-5 h-5 text-gray-500 group-hover:text-orange-500" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600">
              Share with Friends
            </span>
          </button>

          <div className="h-px bg-gray-100 my-2 mx-4" />

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors group"
          >
            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-600" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-red-600">
              Sign Out
            </span>
          </button>
        </nav>

        {/* Branding/Footer */}
        <div className="p-6 mt-auto">
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
            <p className="text-[10px] text-orange-400 font-bold uppercase text-center mb-1">
              Local Trade Street
            </p>
            <p className="text-[9px] text-gray-400 text-center">
              Version 1.0.4 • 2026
            </p>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProfileDropdown;
