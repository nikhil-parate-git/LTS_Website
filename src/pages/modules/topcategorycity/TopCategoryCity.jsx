// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTopCategories } from "../../../redux/slice/topCategory/getTopCategorySlice";
// import { Grid3X3, ChevronUp, LayoutGrid, Loader2 } from "lucide-react";

// const INITIAL_SHOW = 23;

// function CategoryTile({ cat, index }) {
//   const navigate = useNavigate();
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => navigate(`/top-category/${cat._id}`)}
//       className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
//       style={{
//         animation: `fadeUp 0.35s ease both`,
//         animationDelay: `${(index % INITIAL_SHOW) * 0.025}s`,
//       }}
//     >
//       <div
//         className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300 overflow-hidden select-none"
//         style={{
//           borderColor: hovered ? "#f97316" : "#e5e7eb",
//           background: hovered
//             ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
//             : "#fff",
//           boxShadow: hovered
//             ? "0 8px 24px rgba(249,115,22,0.18)"
//             : "0 1px 6px rgba(0,0,0,0.06)",
//           transform: hovered
//             ? "translateY(-4px) scale(1.07)"
//             : "translateY(0) scale(1)",
//         }}
//       >
//         {cat.icon ? (
//           <img
//             src={cat.icon}
//             alt={cat.name}
//             className="w-full h-full object-cover p-1 rounded-2xl"
//           />
//         ) : (
//           <LayoutGrid
//             className="cat-icon"
//             strokeWidth={1.6}
//             style={{
//               color: hovered ? "#f97316" : "#6b7280",
//               transition: "color 0.2s ease",
//             }}
//           />
//         )}
//       </div>
//       <p
//         className="cat-name text-center font-semibold leading-tight transition-colors duration-200"
//         style={{ color: hovered ? "#f97316" : "#374151" }}
//       >
//         {cat.name}
//       </p>
//     </div>
//   );
// }

// // Reusable Button Tiles
// const ActionTile = ({ Icon, label, onClick }) => {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={onClick}
//       className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
//     >
//       <div
//         className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300"
//         style={{
//           borderColor: hovered ? "#f97316" : "#e5e7eb",
//           background: hovered
//             ? "linear-gradient(135deg, #fff7ed, #ffedd5)"
//             : "#fff",
//           boxShadow: hovered
//             ? "0 8px 24px rgba(249,115,22,0.18)"
//             : "0 1px 6px rgba(0,0,0,0.06)",
//           transform: hovered
//             ? "translateY(-4px) scale(1.07)"
//             : "translateY(0) scale(1)",
//         }}
//       >
//         <Icon
//           className="cat-icon"
//           strokeWidth={1.6}
//           style={{ color: hovered ? "#f97316" : "#6b7280" }}
//         />
//       </div>
//       <p
//         className="cat-name text-center font-semibold leading-tight"
//         style={{ color: hovered ? "#f97316" : "#374151" }}
//       >
//         {label}
//       </p>
//     </div>
//   );
// };

// export default function TopCategoryCity() {
//   const dispatch = useDispatch();
//   const [showAll, setShowAll] = useState(false);

//   // Data from Redux
//   const {
//     categories: apiCategories,
//     loading,
//     error,
//   } = useSelector((state) => state.topCategories);
//   const { selectedCity } = useSelector((state) => state.location);

//   useEffect(() => {
//     dispatch(fetchTopCategories());
//   }, [dispatch]);

//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <div className="flex flex-col items-center justify-center py-20">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
//           <p className="mt-4 text-gray-500 font-medium">
//             Fetching Top Categories
//           </p>
//         </div>
//       </div>
//     );

//   if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

//   const visibleCats = showAll
//     ? apiCategories
//     : (apiCategories || []).slice(0, INITIAL_SHOW);

//   return (
//     <section
//       className="py-10 px-4 bg-white"
//       style={{ fontFamily: "'Poppins', sans-serif" }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
//         rel="stylesheet"
//       />

//       <div className="max-w-screen-xl mx-auto">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//             Top Categories in{" "}
//             <span className="text-orange-500">{selectedCity}</span>
//           </h2>
//           <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-orange-500" />
//         </div>

//         <div className="cat-grid">
//           {visibleCats.map((cat, i) => (
//             <CategoryTile key={cat._id} cat={cat} index={i} />
//           ))}

//           {(apiCategories || []).length > INITIAL_SHOW &&
//             (!showAll ? (
//               <ActionTile
//                 Icon={Grid3X3}
//                 label={
//                   <>
//                     View More
//                     <br />
//                     Categories
//                   </>
//                 }
//                 onClick={() => setShowAll(true)}
//               />
//             ) : (
//               <ActionTile
//                 Icon={ChevronUp}
//                 label="Show Less"
//                 onClick={() => setShowAll(false)}
//               />
//             ))}
//         </div>

//         {(apiCategories || []).length > INITIAL_SHOW && (
//           <div className="flex justify-center mt-10">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition-all duration-300"
//             >
//               {showAll ? "← Show Less" : "View All Categories →"}
//             </button>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .cat-grid {
//           display: grid;
//           grid-template-columns: repeat(8, minmax(0, 1fr));
//           gap: 20px 8px;
//         }
//         .icon-box  { width: 80px; height: 80px; }
//         .cat-icon  { width: 28px; height: 28px; }
//         .cat-name  { font-size: 11px; max-width: 88px; }
//         @media (max-width: 1024px) {
//           .cat-grid  { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 18px 8px; }
//           .icon-box  { width: 74px; height: 74px; }
//         }
//         @media (max-width: 768px) {
//           .cat-grid  { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px 6px; }
//           .icon-box  { width: 64px; height: 64px; }
//           .cat-icon  { width: 24px; height: 24px; }
//           .cat-name  { font-size: 10px; max-width: 72px; }
//         }
//         @media (max-width: 540px) {
//           .cat-grid  { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px 6px; }
//           .icon-box  { width: 58px; height: 58px; }
//           .cat-icon  { width: 22px; height: 22px; }
//           .cat-name  { font-size: 9.5px; max-width: 64px; }
//         }
//         @media (max-width: 360px) {
//           .cat-grid  { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px 4px; }
//           .icon-box  { width: 54px; height: 54px; }
//           .cat-icon  { width: 20px; height: 20px; }
//           .cat-name  { font-size: 9px; max-width: 60px; }
//         }
//       `}</style>
//     </section>
//   );
// }


import { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopCategories } from "../../../redux/slice/topCategory/getTopCategorySlice";
import { Grid3X3, ChevronUp, LayoutGrid, Loader2 } from "lucide-react";
import { SEO } from "../../../hooks/useSEO";

const INITIAL_SHOW = 23;

const createSlug = (title = "") =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ─── CategoryTile ──────────────────────────────────────────────────────────────
const CategoryTile = memo(function CategoryTile({ cat, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = useCallback(() => {
    const slug = createSlug(cat.name || "");
    navigate(`/top-category/${cat.cateId}/${slug}`);
  }, [cat.cateId, cat.name, navigate]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
      style={{
        animation: `fadeUp 0.35s ease both`,
        animationDelay: `${(index % INITIAL_SHOW) * 0.025}s`,
      }}
    >
      <div
        className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300 overflow-hidden select-none"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered
            ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
            : "#fff",
          boxShadow: hovered
            ? "0 8px 24px rgba(249,115,22,0.18)"
            : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered
            ? "translateY(-4px) scale(1.07)"
            : "translateY(0) scale(1)",
        }}
      >
        {cat.icon ? (
          <img
            src={cat.icon}
            alt={cat.name}
            loading="lazy"
            className="w-full h-full object-cover p-1 rounded-2xl"
          />
        ) : (
          <LayoutGrid
            className="cat-icon"
            strokeWidth={1.6}
            style={{ color: hovered ? "#f97316" : "#6b7280" }}
          />
        )}
      </div>
      <p
        className="cat-name text-center font-semibold leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#f97316" : "#374151" }}
      >
        {cat.name}
      </p>
    </div>
  );
});

// ─── ActionTile ────────────────────────────────────────────────────────────────
const ActionTile = memo(function ActionTile({ Icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cat-tile flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="icon-box rounded-2xl border flex items-center justify-center transition-all duration-300"
        style={{
          borderColor: hovered ? "#f97316" : "#e5e7eb",
          background: hovered ? "linear-gradient(135deg, #fff7ed, #ffedd5)" : "#fff",
          boxShadow: hovered ? "0 8px 24px rgba(249,115,22,0.18)" : "0 1px 6px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        }}
      >
        <Icon className="cat-icon" strokeWidth={1.6} style={{ color: hovered ? "#f97316" : "#6b7280" }} />
      </div>
      <p className="cat-name text-center font-semibold leading-tight" style={{ color: hovered ? "#f97316" : "#374151" }}>
        {label}
      </p>
    </div>
  );
});

// ─── TopCategoryCity ───────────────────────────────────────────────────────────
export default function TopCategoryCity() {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const { categories: apiCategories, loading, error } = useSelector((state) => state.topCategories);
  const { selectedCity } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchTopCategories());
  }, [dispatch]);

  const toggleShowAll = useCallback(() => setShowAll((prev) => !prev), []);
  const showMore = useCallback(() => setShowAll(true), []);

  const visibleCats = showAll
    ? apiCategories
    : (apiCategories || []).slice(0, INITIAL_SHOW);

  const hasMore = (apiCategories || []).length > INITIAL_SHOW;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin h-10 w-10 text-orange-500" />
        <p className="mt-4 text-gray-500 font-medium">Fetching Top Categories</p>
      </div>
    );

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <section className="py-10 px-4 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SEO
        title={`Top Categories in ${selectedCity} | Local Trade Street`}
        description={`Browse top service categories in ${selectedCity}. Find trusted vendors and businesses on Local Trade Street.`}
        ogType="website"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top Categories in <span className="text-orange-500">{selectedCity}</span>
          </h2>
          <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-orange-500" />
        </div>

        <div className="cat-grid">
          {visibleCats.map((cat, i) => (
            <CategoryTile key={cat._id} cat={cat} index={i} />
          ))}
          {hasMore && (
            !showAll ? (
              <ActionTile
                Icon={Grid3X3}
                label={<>View More<br />Categories</>}
                onClick={showMore}
              />
            ) : (
              <ActionTile
                Icon={ChevronUp}
                label="Show Less"
                onClick={toggleShowAll}
              />
            )
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={toggleShowAll}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3 rounded-xl transition-all duration-300"
            >
              {showAll ? "← Show Less" : "View All Categories →"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .cat-grid { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 20px 8px; }
        .icon-box { width: 80px; height: 80px; }
        .cat-icon { width: 28px; height: 28px; }
        .cat-name { font-size: 11px; max-width: 88px; }
        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 18px 8px; } .icon-box { width: 74px; height: 74px; } }
        @media (max-width: 768px)  { .cat-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px 6px; } .icon-box { width: 64px; height: 64px; } .cat-icon { width: 24px; height: 24px; } .cat-name { font-size: 10px; max-width: 72px; } }
        @media (max-width: 540px)  { .cat-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px 6px; } .icon-box { width: 58px; height: 58px; } .cat-icon { width: 22px; height: 22px; } .cat-name { font-size: 9.5px; max-width: 64px; } }
        @media (max-width: 360px)  { .cat-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px 4px; } .icon-box { width: 54px; height: 54px; } .cat-icon { width: 20px; height: 20px; } .cat-name { font-size: 9px; max-width: 60px; } }
      `}</style>
    </section>
  );
}