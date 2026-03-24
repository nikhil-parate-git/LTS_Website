import React, { useEffect, useState } from "react"; // 1. useState add kiya
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRightCatSub } from "../../redux/slice/rightSidebar/getTopRightCatSubSlice";
import { Search, Mic, ChevronLeft, MoreHorizontal, Croissant } from "lucide-react";

export default function HamburgerDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.topRightCatSub);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchTopRightCatSub());
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
      setSearchTerm("");
    }
  }, [isOpen, dispatch]);

  const groupedData = data.reduce((acc, item) => {
    const catId = item.category._id;
    if (!acc[catId]) {
      acc[catId] = {
        name: item.category.name,
        icon: item.category.icon,
        subCategories: [],
      };
    }
    if (!acc[catId].subCategories.includes(item.subCategory.name)) {
      acc[catId].subCategories.push(item.subCategory.name);
    }
    return acc;
  }, {});

  const filteredCategories = Object.values(groupedData).filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[600px] lg:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full overflow-y-auto px-6 py-8">
          {/* Close & Search */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-100">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search Category..."
                className="flex-1 px-3 text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                <p className="mt-4 text-gray-500 font-medium">
                  Fetching Top Categories
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* 6. Filtered categories map karein */}
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center p-2.5 overflow-hidden border border-orange-100">
                        <img
                          src={cat.icon}
                          alt={cat.name}
                          className="w-full h-full object-contain"
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/50")
                          }
                        />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {cat.name}
                      </h2>
                    </div>

                    <div className="pl-16 flex flex-wrap gap-x-6 gap-y-3">
                      {cat.subCategories.map((sub, i) => (
                        <span
                          key={i}
                          className="text-sm text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                      <MoreHorizontal
                        size={18}
                        className="text-gray-300 hover:text-orange-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">
                    No category found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
