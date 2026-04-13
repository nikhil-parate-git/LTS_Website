import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryById,
  resetCategoryData,
} from "../../../redux/slice/topCategory/getTopCateogoryByIdSlice";
import {
  MapPin,
  Search,
  ChevronRight,
  Home,
  ArrowLeft,
  LayoutGrid,
  Star,
  TrendingUp,
  Sparkles,
  ChevronRight as ArrowRight,
} from "lucide-react";

const TopCategoryDetails = () => {
  const { slug: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  const { categoryData, loading, error } = useSelector(
    (state) => state.topcategoryById,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id));
    }
    return () => dispatch(resetCategoryData());
  }, [dispatch, id]);

  const colorSchemes = [
    {
      gradient: "from-orange-50 to-amber-50",
      border: "border-orange-200",
      iconBg: "bg-gradient-to-br from-orange-400 to-amber-300",
      accent: "text-orange-600",
      hoverBorder: "hover:border-orange-300",
    },
    {
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-300",
      accent: "text-blue-600",
      hoverBorder: "hover:border-blue-300",
    },
    {
      gradient: "from-emerald-50 to-teal-50",
      border: "border-emerald-200",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-300",
      accent: "text-emerald-600",
      hoverBorder: "hover:border-emerald-300",
    },
    {
      gradient: "from-purple-50 to-pink-50",
      border: "border-purple-200",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-300",
      accent: "text-purple-600",
      hoverBorder: "hover:border-purple-300",
    },
  ];

  const filteredSections = useMemo(() => {
    if (!categoryData) return [];

    const allSections = categoryData.map((item, index) => ({
      id: item._id,
      catId: item.categoryId?._id,
      subCatId: item.subCategoryId?._id,
      title: item.subCategoryId?.name || "Service",
      icon: <LayoutGrid size={20} className="text-white" />,
      colorScheme: colorSchemes[index % colorSchemes.length],
      items: item.keyword || [],
    }));

    if (!search.trim()) return allSections;

    return allSections.filter((section) =>
      section.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categoryData, search]);

  const label = categoryData?.[0]?.categoryId?.name || "Category Details";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-500 font-medium">
            Fetching Best Subcategory And Keywords For You...
          </p>
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="w-full px-3 sm:px-6 md:px-8 py-3 md:py-4">
          <h1 className="text-center text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 mt-5">
            Find Top Businesses In Your City
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mt-5 mb-5">
            <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white px-3 py-2 gap-2 sm:flex-1 focus-within:border-orange-400 transition-all duration-200 shadow-sm hover:shadow-md">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by subcategory name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent"
              />
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg p-1.5 shrink-0 transition-all duration-200 shadow-md hover:shadow-lg">
                <Search size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-3 sm:px-6 md:px-8 mt-2">
        <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2">
          <div className="flex items-center gap-2 overflow-x-auto min-w-0 scrollbar-hide">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-200 bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
            >
              <ArrowLeft size={13} />
            </button>

            <div className="w-px h-4 bg-gray-200 shrink-0" />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors shrink-0"
            >
              <Home size={12} />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>

            <ChevronRight size={11} className="text-gray-300 shrink-0" />

            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-orange-600 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-full px-2.5 py-0.5 whitespace-nowrap shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shrink-0 animate-pulse" />
              <span className="max-w-[150px] truncate">{label}</span>
            </span>
          </div>

          <div className="shrink-0 ml-2 hidden sm:block">
            <span className="text-[11px] text-gray-600 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 rounded-full px-3 py-1 font-medium shadow-sm">
              {filteredSections.length} Sub-Categories
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-3 sm:px-6 md:px-8 py-6 sm:py-8">
        {filteredSections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredSections.map((cat) => (
              <div
                key={cat.id}
                className={`group relative bg-gradient-to-br ${cat.colorScheme.gradient} border-2 ${cat.colorScheme.border} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
                </div>

                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-3 ${cat.colorScheme.iconBg} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {cat.icon}
                    </div>
                  </div>

                  <h2
                    className={`font-bold text-base sm:text-lg ${cat.colorScheme.accent} leading-tight group-hover:translate-x-1 transition-transform duration-300 mb-2`}
                  >
                    {cat.title}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <TrendingUp size={12} />
                    <span>Popular Keywords</span>
                    <Sparkles size={10} className="text-yellow-500" />
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="border-t border-gray-200/50 pt-3 mb-2">
                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                      <Star
                        size={10}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      RECOMMENDED
                    </p>
                  </div>
                  <ul
                    className="space-y-2 max-h-64 overflow-y-auto"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#e5e7eb #f3f4f6",
                    }}
                  >
                    {cat.items.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() =>
                          navigate(`/service/${cat.catId}/${cat.subCatId}`)
                        }
                        className="group/item relative flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 cursor-pointer transition-all duration-200 py-1.5 px-2 rounded-lg hover:bg-white/50 hover:shadow-sm"
                      >
                        <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 group-hover/item:scale-125 transition-all duration-200"></span>
                        <span className="flex-1 font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                          {item}
                        </span>
                        <ArrowRight
                          size={12}
                          className="opacity-0 group-hover/item:opacity-100 transition-all duration-200 transform group-hover/item:translate-x-0 -translate-x-2"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner">
            <LayoutGrid size={32} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium text-lg">
              No subcategories found matching your search.
            </p>
          </div>
        )}
      </div>
      <style jsx>{`
        ul::-webkit-scrollbar {
          width: 4px;
        }
        ul::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        ul::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }
        ul::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
          border-color: #d1d5db;
        }
        ul {
          scrollbar-color: #e5e7eb #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default TopCategoryDetails;
