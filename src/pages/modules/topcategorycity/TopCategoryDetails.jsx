import React, { useState, useEffect } from "react";
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
  Loader2,
  LayoutGrid,
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

  const sections =
    categoryData?.map((item) => ({
      id: item._id,
      catId: item.categoryId?._id,  
      subCatId: item.subCategoryId?._id, 
      title: item.subCategoryId?.name || "Service",
      icon: <LayoutGrid size={18} className="text-orange-500" />,
      color: "bg-orange-50 border-orange-200",
      headerColor: "text-orange-600",
      items: item.keyword || [],
    })) || [];
 
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
    <div className="min-h-screen font-sans"> 
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="w-full px-3 sm:px-6 md:px-8 py-3 md:py-4">
          <h1 className="text-center text-base sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Find Top Businesses In Your City
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 gap-2 sm:flex-1">
              <MapPin size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 gap-2 sm:flex-1">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm text-gray-600 outline-none w-full bg-transparent"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white rounded p-1 shrink-0 transition-colors">
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
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 bg-gray-50 hover:bg-orange-500 hover:text-white transition-all shrink-0"
            >
              <ArrowLeft size={13} />
            </button>

            <div className="w-px h-4 bg-gray-200 shrink-0" />

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-orange-500 shrink-0"
            >
              <Home size={12} />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>

            <ChevronRight size={11} className="text-gray-300 shrink-0" />

            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              <span className="max-w-[150px] truncate">{label}</span>
            </span>
          </div>

          <div className="shrink-0 ml-2 hidden sm:block">
            <span className="text-[11px] text-gray-400 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 font-medium">
              {sections.length} Sub-Categories
            </span>
          </div>
        </div>
      </div>
 
      <div className="w-full px-3 sm:px-6 md:px-8 py-4 sm:py-6">
        {sections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sections.map((cat) => (
              <div
                key={cat.id}
                className={`border rounded-lg p-3 sm:p-4 ${cat.color} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                  <div className="p-1.5 bg-white rounded-md shadow-sm shrink-0">
                    {cat.icon}
                  </div>
                  <h2
                    className={`font-semibold text-xs sm:text-sm leading-snug ${cat.headerColor}`}
                  >
                    {cat.title}
                  </h2>
                </div>
                <ul className="space-y-0.5 sm:space-y-1">
                  {cat.items.map((item, idx) => (
                    <li
                      key={idx} 
                      onClick={() =>
                        navigate(`/service/${cat.catId}/${cat.subCatId}`)
                      }
                      className="text-[13px] sm:text-sm text-gray-600 hover:text-orange-500 cursor-pointer hover:underline leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            No keywords found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCategoryDetails;
