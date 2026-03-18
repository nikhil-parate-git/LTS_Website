import React, { useEffect, useState } from "react";
import { Users, Share2, LogOut, ChevronLeft, Pencil, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slice/profile/getProfile";

const ProfileDropdown = ({ onClose, onLogout }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profile);
  
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSmoothClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const userName = data?.name || "User";
  const userPhone = data?.phone || "No phone linked";

  return (
    <div className="fixed inset-0 z-[60] flex justify-end md:pt-16 pointer-events-none">
  
      <div 
        className={`absolute inset-0 bg-black/20 md:hidden pointer-events-auto transition-opacity duration-300 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`} 
        onClick={handleSmoothClose} 
      />
      
      <div 
        className="relative w-full h-full md:h-auto md:w-90 bg-white shadow-2xl md:rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
        style={{ 
          animation: isExiting 
            ? "slideOutRight 0.3s ease-in forwards" 
            : "slideInRight 0.3s ease-out forwards" 
        }}
      >
        {/* Header Section */}
        <div className="p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-2xl font-bold text-orange-500 border border-orange-100">
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <p className="text-gray-500 text-xs">Welcome back,</p>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 truncate max-w-[150px]">
                    {userName}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 font-medium">{userPhone}</p>
              </div>
            </div>
          </div>
          {/* Smooth Close Triggered here */}
          <button 
            onClick={handleSmoothClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Menu Options */}
        <div className="flex-1 px-2">
          <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors group">
            <Users className="w-6 h-6 text-gray-700 group-hover:text-orange-500" />
            <span className="text-lg font-medium text-gray-800">Help your Community</span>
          </button>
          
          <div className="h-px bg-gray-100 mx-4" />
          
          <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 rounded-xl transition-colors group">
            <Share2 className="w-6 h-6 text-gray-700 group-hover:text-orange-500" />
            <span className="text-lg font-medium text-gray-800">Share App</span>
          </button>

          <div className="h-px bg-gray-100 mx-4" />

          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-red-50 rounded-xl transition-colors group"
          >
            <LogOut className="w-6 h-6 text-gray-700 group-hover:text-red-600" />
            <span className="text-lg font-medium text-gray-800 group-hover:text-red-600">Sign Out</span>
          </button>
        </div>

        {/* Decoration */}
        <div className="mt-auto opacity-10 p-4 pointer-events-none">
           <div className="h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProfileDropdown;