// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
// import {
//   fetchBlogsByCategory,
//   paginateAllBlogs,
// } from "../../../redux/slice/blog/getBlogSlice";
// import blog from "../../../assets/blog.png";

// const Blog = () => {
//   const dispatch = useDispatch();

//   // ── Selectors ──────────────────────────────────────────────────────────────
//   const { categories: apiCategories, loading: categoriesLoading } = useSelector(
//     (state) => state.categories,
//   );
//   const {
//     blogs: apiBlogs,
//     loading: blogsLoading,
//     error: blogsError,
//     pagination,
//   } = useSelector((state) => state.blogs);

//   // ── Local state ────────────────────────────────────────────────────────────
//   const [activeCategory, setActiveCategory] = useState({
//     label: "All",
//     value: "All",
//     id: null,
//   });
//   const carouselRef = useRef(null);

//   // ── Fetch categories once ──────────────────────────────────────────────────
//   useEffect(() => {
//     dispatch(fetchAllCategories());
//   }, [dispatch]);

//   // ── Fetch blogs when category changes ─────────────────────────────────────
//   useEffect(() => {
//     if (!apiCategories || apiCategories.length === 0) return;

//     const allIds = apiCategories.map((c) => c._id || c.id);

//     dispatch(
//       fetchBlogsByCategory({
//         categoryId: activeCategory.id, // null = "All"
//         categoryIds: allIds, // needed for parallel fetch on "All"
//         page: 1,
//       }),
//     );
//   }, [dispatch, activeCategory.id, apiCategories]);

//   // ── Build category tabs ────────────────────────────────────────────────────
//   const buildCategories = () => {
//     const all = { label: "All", value: "All", id: null };
//     if (!apiCategories || apiCategories.length === 0) return [all];
//     return [
//       all,
//       ...apiCategories.map((cat) => ({
//         label: cat.name || cat.categoryName || cat.title || "",
//         value: cat.name || cat.categoryName || cat.title || "",
//         id: cat._id || cat.id || null,
//       })),
//     ];
//   };

//   const categories = buildCategories();

//   // ── Category click ─────────────────────────────────────────────────────────
//   const handleCategoryClick = (cat) => {
//     setActiveCategory(cat);
//   };

//   // ── Pagination handler ─────────────────────────────────────────────────────
//   const handlePageChange = (page) => {
//     if (page < 1 || (pagination && page > pagination.totalPages)) return;

//     if (activeCategory.id === null) {
//       // "All" — client-side pagination from cache
//       dispatch(paginateAllBlogs(page));
//     } else {
//       // Single category — call backend with new page
//       const allIds = apiCategories.map((c) => c._id || c.id);
//       dispatch(
//         fetchBlogsByCategory({
//           categoryId: activeCategory.id,
//           categoryIds: allIds,
//           page,
//         }),
//       );
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // ── Derived blog lists ─────────────────────────────────────────────────────
//   const featuredBlog = apiBlogs.length > 0 ? apiBlogs[0] : null;
//   const restBlogs = apiBlogs.length > 1 ? apiBlogs.slice(1) : [];

//   // ── Helpers ────────────────────────────────────────────────────────────────
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getInitials = (name = "") =>
//     name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);

//   const scrollCarousel = (dir) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
//     }
//   };

//   // ── isPageLoading: true while categories OR blogs are being fetched ─────────
//   // This prevents the empty-state flash on refresh
//   const isPageLoading = categoriesLoading || blogsLoading;

//   // ── Skeleton ───────────────────────────────────────────────────────────────
//   const SkeletonCard = () => (
//     <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
//       <div className="h-52 bg-gray-200" />
//       <div className="p-5 space-y-3">
//         <div className="h-3 bg-gray-200 rounded w-1/3" />
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-200 rounded w-full" />
//         <div className="h-3 bg-gray-200 rounded w-5/6" />
//       </div>
//     </div>
//   );

//   // ── Pagination component ───────────────────────────────────────────────────
//   const Pagination = () => {
//     if (!pagination || pagination.totalPages <= 1) return null;
//     const { page, totalPages, total } = pagination;

//     const getPageNumbers = () => {
//       const pages = [];
//       const delta = 2;
//       const left = Math.max(1, page - delta);
//       const right = Math.min(totalPages, page + delta);
//       if (left > 1) {
//         pages.push(1);
//         if (left > 2) pages.push("...");
//       }
//       for (let i = left; i <= right; i++) pages.push(i);
//       if (right < totalPages) {
//         if (right < totalPages - 1) pages.push("...");
//         pages.push(totalPages);
//       }
//       return pages;
//     };

//     return (
//       <div className="flex flex-col items-center gap-4 mt-12">
//         <p className="text-sm text-gray-500">
//           Showing page <span className="font-bold text-orange-600">{page}</span>{" "}
//           of <span className="font-bold text-gray-800">{totalPages}</span> —{" "}
//           <span className="font-bold text-orange-600">{total}</span> total
//           articles
//         </p>
//         <div className="flex items-center gap-2">
//           {/* Prev */}
//           <button
//             onClick={() => handlePageChange(page - 1)}
//             disabled={page === 1}
//             className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           {getPageNumbers().map((p, i) =>
//             p === "..." ? (
//               <span
//                 key={`dots-${i}`}
//                 className="px-1 text-gray-400 font-medium"
//               >
//                 ...
//               </span>
//             ) : (
//               <button
//                 key={p}
//                 onClick={() => handlePageChange(p)}
//                 className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
//                   p === page
//                     ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-110"
//                     : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
//                 }`}
//               >
//                 {p}
//               </button>
//             ),
//           )}

//           {/* Next */}
//           <button
//             onClick={() => handlePageChange(page + 1)}
//             disabled={page === totalPages}
//             className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // ── Render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-[#fafaf8] font-sans">
//       {/* ── HERO ── */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white">
//         <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute top-10 right-1/3 w-64 h-64 bg-orange-300/20 rounded-full blur-2xl pointer-events-none" />
//         <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-black/10 rounded-full blur-3xl pointer-events-none" />
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle, #fff 1px, transparent 1px)",
//             backgroundSize: "28px 28px",
//           }}
//         />
//         <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
//           <div className="flex-1 text-center md:text-left">
//             <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white/20 border border-white/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
//               <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse" />
//               Local Trade Street — Blogs
//             </span>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
//               Discover Local
//               <br />
//               <span className="text-amber-200">Services &amp; Stories</span>
//             </h1>
//             <p className="text-base md:text-lg text-orange-100 max-w-lg leading-relaxed">
//               Explore tips, guides, and updates across every service category —
//               from pest control to car repair. Find what matters for your city.
//             </p>
//           </div>
//           <div className="hidden md:flex flex-shrink-0 items-center justify-center">
//             <div className="relative w-[480px] h-[290px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/25 hero-img-wrap">
//               <img
//                 src={blog}
//                 alt="Blog illustration"
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                   e.currentTarget
//                     .closest(".hero-img-wrap")
//                     .classList.add("hero-img-placeholder");
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none rounded-3xl" />
//             </div>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 56"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M0 56L48 46.7C96 37.3 192 18.7 288 14C384 9.3 480 18.7 576 25.7C672 32.7 768 37.3 864 37.3C960 37.3 1056 32.7 1152 25.7C1248 18.7 1344 9.3 1392 4.7L1440 0V56H1392C1344 56 1248 56 1152 56C1056 56 960 56 864 56C768 56 672 56 576 56C480 56 384 56 288 56C192 56 96 56 48 56H0Z"
//               fill="#fafaf8"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* ── CATEGORY CAROUSEL ── */}
//       <div className="sticky top-0 z-30 bg-[#fafaf8]/97 backdrop-blur-md border-b border-gray-200 shadow-sm">
//         <div className="max-w-6xl  mx-auto px-4 py-3 flex items-center gap-2">
//           <button
//             onClick={() => scrollCarousel(-1)}
//             className="flex-shrink-0 w-9  h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:shadow-md active:scale-95 transition-all duration-200 shadow-sm"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//           </button>

//           <div className="relative flex-1 overflow-hidden">
//             <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
//             <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />
//             <div
//               ref={carouselRef}
//               className="flex items-center gap-2 overflow-x-auto px-2 py-1"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//                 WebkitOverflowScrolling: "touch",
//               }}
//             >
//               {categoriesLoading
//                 ? Array.from({ length: 8 }).map((_, i) => (
//                     <div
//                       key={i}
//                       className="flex-shrink-0 h-9 rounded-full bg-gray-200 animate-pulse"
//                       style={{ width: `${80 + i * 10}px` }}
//                     />
//                   ))
//                 : categories.map((cat) => (
//                     <button
//                       key={cat.value}
//                       onClick={() => handleCategoryClick(cat)}
//                       className={`flex-shrink-0 cursor-pointer px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
//                         activeCategory.value === cat.value
//                           ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-105"
//                           : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 hover:scale-105"
//                       }`}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//             </div>
//           </div>

//           <button
//             onClick={() => scrollCarousel(1)}
//             className="flex-shrink-0 w-9 h-9  flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:shadow-md active:scale-95 transition-all duration-200 shadow-sm"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <main className="max-w-6xl mx-auto px-4 py-12">
//         {/* Count bar */}
//         <div className="flex items-center justify-between mb-8">
//           <p className="text-sm text-gray-500">
//             {isPageLoading ? (
//               <span className="inline-block w-40 h-4 bg-gray-200 rounded animate-pulse" />
//             ) : (
//               <>
//                 Showing{" "}
//                 <span className="font-bold text-orange-600">
//                   {apiBlogs.length}
//                 </span>{" "}
//                 article{apiBlogs.length !== 1 ? "s" : ""}
//                 {activeCategory.value !== "All" && (
//                   <>
//                     {" "}
//                     in{" "}
//                     <span className="font-bold text-gray-800">
//                       {activeCategory.label}
//                     </span>
//                   </>
//                 )}
//                 {pagination && (
//                   <span className="text-gray-400 ml-1">
//                     (page {pagination.page} of {pagination.totalPages})
//                   </span>
//                 )}
//               </>
//             )}
//           </p>
//           {activeCategory.value !== "All" && (
//             <button
//               onClick={() =>
//                 handleCategoryClick({ label: "All", value: "All", id: null })
//               }
//               className="text-xs text-orange-500 font-semibold hover:underline flex items-center gap-1"
//             >
//               <svg
//                 className="w-3 h-3"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//               Clear filter
//             </button>
//           )}
//         </div>

//         {/* Error */}
//         {blogsError && !isPageLoading && (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">⚠️</div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               Failed to load blogs
//             </h3>
//             <p className="text-gray-500 mb-6">{blogsError}</p>
//             <button
//               onClick={() => {
//                 const allIds = (apiCategories || []).map((c) => c._id || c.id);
//                 dispatch(
//                   fetchBlogsByCategory({
//                     categoryId: activeCategory.id,
//                     categoryIds: allIds,
//                     page: 1,
//                   }),
//                 );
//               }}
//               className="px-6 py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Loading skeletons — shown while categories OR blogs are loading */}
//         {isPageLoading && (
//           <>
//             <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-12 animate-pulse">
//               <div className="grid md:grid-cols-2 min-h-[360px]">
//                 <div className="bg-gray-200 min-h-[240px]" />
//                 <div className="p-8 md:p-10 space-y-4">
//                   <div className="h-3 bg-gray-200 rounded w-1/4" />
//                   <div className="h-6 bg-gray-200 rounded w-3/4" />
//                   <div className="h-6 bg-gray-200 rounded w-1/2" />
//                   <div className="h-3 bg-gray-200 rounded w-full" />
//                   <div className="h-3 bg-gray-200 rounded w-5/6" />
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <SkeletonCard key={i} />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Empty — only shown when fully loaded and truly no results */}
//         {!isPageLoading && !blogsError && apiBlogs.length === 0 && (
//           <div className="text-center py-32">
//             <div className="text-7xl mb-5">🗂️</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">
//               No articles found
//             </h3>
//             <p className="text-gray-500 mb-6">
//               There are no posts in <strong>{activeCategory.label}</strong> yet.
//             </p>
//           </div>
//         )}

//         {/* Blogs — only shown when fully loaded and results exist */}
//         {!isPageLoading && !blogsError && apiBlogs.length > 0 && (
//           <>
//             {/* FEATURED */}
//             {featuredBlog && (
//               <article className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 mb-12 border border-gray-100 cursor-pointer">
//                 <div className="grid md:grid-cols-2 min-h-[360px]">
//                   <div className="relative overflow-hidden min-h-[240px] md:min-h-0">
//                     {featuredBlog.image ? (
//                       <img
//                         src={featuredBlog.image}
//                         alt={featuredBlog.title}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 absolute inset-0 flex items-center justify-center">
//                         <span className="text-white text-6xl opacity-30">
//                           📝
//                         </span>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

//                     {featuredBlog.categoryId?.name && (
//                       <span className="absolute top-5 right-5 text-xs font-bold bg-white/90 text-orange-600 rounded-full px-3 py-1.5 shadow">
//                         {featuredBlog.categoryId.name}
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-8 md:p-10 flex flex-col justify-center">
//                     {featuredBlog.categoryId?.name && (
//                       <span className="inline-block text-xs font-bold bg-orange-100 text-orange-600 rounded-full px-3 py-1 mb-4 w-fit">
//                         {featuredBlog.categoryId.name}
//                       </span>
//                     )}
//                     <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 group-hover:text-orange-600 transition-colors duration-300">
//                       {featuredBlog.title}
//                     </h2>
//                     <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
//                       {featuredBlog.description}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center ring-2 ring-orange-200 text-white text-sm font-bold flex-shrink-0">
//                           {getInitials(featuredBlog.author)}
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900">
//                             {featuredBlog.author}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             {formatDate(featuredBlog.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-300">
//                         Read
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2.5}
//                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                           />
//                         </svg>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             )}

//             {/* GRID */}
//             {restBlogs.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
//                 {restBlogs.map((blogItem, index) => (
//                   <article
//                     key={blogItem._id}
//                     className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer blog-card"
//                     style={{ animationDelay: `${index * 80}ms` }}
//                   >
//                     <div className="relative overflow-hidden h-52">
//                       {blogItem.image ? (
//                         <img
//                           src={blogItem.image}
//                           alt={blogItem.title}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
//                           <span className="text-white text-5xl opacity-30">
//                             📝
//                           </span>
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       {blogItem.categoryId?.name && (
//                         <span className="absolute top-3.5 left-3.5 text-xs font-bold bg-orange-500 text-white rounded-full px-3 py-1 shadow">
//                           {blogItem.categoryId.name}
//                         </span>
//                       )}
//                     </div>
//                     <div className="p-5">
//                       <div className="flex items-center gap-2.5 mb-4">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center ring-2 ring-orange-100 text-white text-xs font-bold flex-shrink-0">
//                           {getInitials(blogItem.author)}
//                         </div>
//                         <div>
//                           <p className="text-xs font-semibold text-gray-800">
//                             {blogItem.author}
//                           </p>
//                           <p className="text-[11px] text-gray-400">
//                             {formatDate(blogItem.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                       <h2 className="text-base font-black text-gray-900 mb-2.5 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
//                         {blogItem.title}
//                       </h2>
//                       <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
//                         {blogItem.description}
//                       </p>
//                       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                         <button className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-300">
//                           Read More
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2.5}
//                               d="M14 5l7 7m0 0l-7 7m7-7H3"
//                             />
//                           </svg>
//                         </button>
//                         <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-200">
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}

//             <Pagination />
//           </>
//         )}
//       </main>

//       <style>{`
//         @keyframes blog-in {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .blog-card { animation: blog-in 0.45s ease-out both; }
//         .hero-img-placeholder {
//           background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%) !important;
//           border: 2px dashed rgba(255,255,255,0.4) !important;
//           display: flex !important;
//           align-items: center;
//           justify-content: center;
//         }
//         .hero-img-placeholder::after {
//           content: "📷  Add your image here";
//           color: rgba(255,255,255,0.65);
//           font-size: 13px;
//           font-weight: 600;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Blog;



import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../../../redux/slice/category/getAllCategorySlice";
import {
  fetchBlogsByCategory,
  fetchMoreForCategory,
} from "../../../redux/slice/blog/getBlogSlice";
import blog from "../../../assets/blog.png";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ── Skeleton components ──────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
    <div className="h-44 bg-gray-200" />
    <div className="p-4 space-y-2.5">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

const SkeletonFeatured = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-12 animate-pulse">
    <div className="grid md:grid-cols-2 min-h-[360px]">
      <div className="bg-gray-200 min-h-[240px]" />
      <div className="p-8 md:p-10 space-y-4">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  </div>
);

const SkeletonGridCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

// ── Blog Card (used in horizontal carousels) ─────────────────────────────────

const BlogCard = ({ blogItem, index }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const catId =
      blogItem.categoryId?._id ||
      blogItem.categoryId?.id ||
      blogItem.categoryId;
    navigate(`/blog/${catId}/${blogItem._id}`);
  };

  return (
    <article
      onClick={handleNavigate}
      className="flex-shrink-0 w-72 group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer blog-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden h-44">
        {blogItem.image ? (
          <img
            src={blogItem.image}
            alt={blogItem.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
            <span className="text-white text-5xl opacity-30">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {blogItem.categoryId?.name && (
          <span className="absolute top-3 left-3 text-xs font-bold bg-orange-500 text-white rounded-full px-2.5 py-1 shadow">
            {blogItem.categoryId.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center ring-2 ring-orange-100 text-white text-[10px] font-bold flex-shrink-0">
            {getInitials(blogItem.author)}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">
              {blogItem.author}
            </p>
            <p className="text-[10px] text-gray-400">
              {formatDate(blogItem.createdAt)}
            </p>
          </div>
        </div>
        <h3 className="text-sm font-black text-gray-900 mb-1.5 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
          {blogItem.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {blogItem.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="inline-flex cursor-pointer items-center gap-1 text-orange-500 font-bold text-xs group-hover:gap-2 transition-all duration-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

// ── Category Row (horizontal scroll) ────────────────────────────────────────

const CategoryRow = ({ group, categoryName, isLoadingMore, onLoadMore }) => {
  const rowRef = useRef(null);
  const loadMoreRef = useRef(null);
  const { blogs, pagination } = group;
  const hasMore = pagination && pagination.page < pagination.totalPages;

  const scrollRow = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          onLoadMore(group.categoryId, (pagination?.page || 1) + 1);
        }
      },
      { root: rowRef.current, threshold: 0.5 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, group.categoryId, pagination?.page, onLoadMore]);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <h2 className="text-lg font-black text-gray-900">{categoryName}</h2>
          {pagination?.total && (
            <span className="text-xs font-semibold bg-orange-100 text-orange-600 rounded-full px-2.5 py-0.5">
              {pagination.total} articles
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollRow(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm active:scale-95 transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollRow(1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 shadow-sm active:scale-95 transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none rounded-l-2xl" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none rounded-r-2xl" />
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto pb-3 px-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {blogs.map((b, i) => (
            <BlogCard key={b._id} blogItem={b} index={i} />
          ))}

          {hasMore && (
            <div
              ref={loadMoreRef}
              className="flex-shrink-0 flex items-center justify-center w-20"
            >
              {isLoadingMore ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                  <p className="text-xs text-gray-400">Loading…</p>
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages, total } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);
    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <p className="text-sm text-gray-500">
        Page <span className="font-bold text-orange-600">{page}</span> of{" "}
        <span className="font-bold text-gray-800">{totalPages}</span> —{" "}
        <span className="font-bold text-orange-600">{total}</span> total
        articles
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`d${i}`} className="px-1 text-gray-400 font-medium">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                p === page
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-110"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-orange-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ── Main Blog Component ──────────────────────────────────────────────────────

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories: apiCategories, loading: categoriesLoading } = useSelector(
    (state) => state.categories,
  );
  const {
    mode,
    blogs: apiBlogs,
    groupedByCategory,
    loading: blogsLoading,
    error: blogsError,
    pagination,
    categoryLoadingMap,
  } = useSelector((state) => state.blogs);

  const [activeCategory, setActiveCategory] = useState({
    label: "All",
    value: "All",
    id: null,
  });
  const carouselRef = useRef(null);

  const isPageLoading = categoriesLoading || blogsLoading;

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!apiCategories || apiCategories.length === 0) return;
    const allIds = apiCategories.map((c) => c._id || c.id);
    dispatch(
      fetchBlogsByCategory({
        categoryId: activeCategory.id,
        categoryIds: allIds,
        page: 1,
      }),
    );
  }, [dispatch, activeCategory.id, apiCategories]);

  const buildCategories = () => {
    const all = { label: "All", value: "All", id: null };
    if (!apiCategories || apiCategories.length === 0) return [all];
    return [
      all,
      ...apiCategories.map((cat) => ({
        label: cat.name || cat.categoryName || cat.title || "",
        value: cat.name || cat.categoryName || cat.title || "",
        id: cat._id || cat.id || null,
      })),
    ];
  };
  const categories = buildCategories();

  const getCategoryName = (catId) => {
    const found = apiCategories?.find((c) => (c._id || c.id) === catId);
    return found?.name || found?.categoryName || found?.title || "Category";
  };

  const handleCategoryClick = (cat) => setActiveCategory(cat);

  const handlePageChange = (page) => {
    if (page < 1 || (pagination && page > pagination.totalPages)) return;
    const allIds = apiCategories.map((c) => c._id || c.id);
    dispatch(
      fetchBlogsByCategory({
        categoryId: activeCategory.id,
        categoryIds: allIds,
        page,
      }),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = useCallback(
    (categoryId, nextPage) => {
      dispatch(fetchMoreForCategory({ categoryId, page: nextPage }));
    },
    [dispatch],
  );

  const scrollCarousel = (dir) => {
    if (carouselRef.current)
      carouselRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  // Navigate to blog detail
  const navigateToBlog = (blogItem) => {
    const catId =
      blogItem.categoryId?._id ||
      blogItem.categoryId?.id ||
      blogItem.categoryId;
    navigate(`/blog/${catId}/${blogItem._id}`);
  };

  const featuredBlog =
    mode === "single" && apiBlogs.length > 0 ? apiBlogs[0] : null;
  const restBlogs =
    mode === "single" && apiBlogs.length > 1 ? apiBlogs.slice(1) : [];

  return (
    <div className="min-h-screen bg-[#fafaf8] font-sans">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 text-white mb-[-2px]">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-orange-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-black/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white/20 border border-white/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse" />
              Local Trade Street — Blogs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
              Discover Local
              <br />
              <span className="text-amber-200">Services &amp; Stories</span>
            </h1>
            <p className="text-base md:text-lg text-orange-100 max-w-lg leading-relaxed">
              "Expert insights, practical guides, and real updates — everything
              you need, all in one place."
            </p>
          </div>
          <div className="hidden md:flex flex-shrink-0 items-center justify-center">
            <div className="relative w-[480px] h-[290px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/25 hero-img-wrap">
              <img
                src={blog}
                alt="Blog illustration"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget
                    .closest(".hero-img-wrap")
                    .classList.add("hero-img-placeholder");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none rounded-3xl" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[-1px] left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 27C672 34 768 38 864 38C960 38 1056 34 1152 27C1248 20 1344 10 1392 5L1440 0V60H0Z"
              fill="#fafaf8"
            />
          </svg>
        </div>
      </section>

      {/* ── CATEGORY CAROUSEL ── */}
      {/* NOTE: border-b removed — no orange line */}
      <div className="sticky top-0 z-20 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <button
            onClick={() => scrollCarousel(-1)}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:shadow-md active:scale-95 transition-all shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />
            <div
              ref={carouselRef}
              className="flex items-center gap-2 overflow-x-auto px-2 py-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {categoriesLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 h-9 rounded-full bg-gray-200 animate-pulse"
                      style={{ width: `${80 + i * 10}px` }}
                    />
                  ))
                : categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryClick(cat)}
                      className={`flex-shrink-0 cursor-pointer px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                        activeCategory.value === cat.value
                          ? "bg-orange-500 text-white shadow-md shadow-orange-200 scale-105"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 hover:scale-105"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
            </div>
          </div>
          <button
            onClick={() => scrollCarousel(1)}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:border-orange-400 hover:text-orange-500 hover:shadow-md active:scale-95 transition-all shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Count bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            {isPageLoading ? (
              <span className="inline-block w-40 h-4 bg-gray-200 rounded animate-pulse" />
            ) : mode === "all" ? (
              <>
                Showing all blogs across{" "}
                <span className="font-bold text-orange-600">
                  {groupedByCategory.length}
                </span>{" "}
                categories
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-orange-600">
                  {apiBlogs.length}
                </span>{" "}
                article{apiBlogs.length !== 1 ? "s" : ""} in{" "}
                <span className="font-bold text-gray-800">
                  {activeCategory.label}
                </span>
                {pagination && (
                  <span className="text-gray-400 ml-1">
                    (page {pagination.page} of {pagination.totalPages})
                  </span>
                )}
              </>
            )}
          </p>
          {activeCategory.value !== "All" && (
            <button
              onClick={() =>
                handleCategoryClick({ label: "All", value: "All", id: null })
              }
              className="text-xs text-orange-500 font-semibold hover:underline flex items-center gap-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear filter
            </button>
          )}
        </div>

        {/* Error */}
        {blogsError && !isPageLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Failed to load blogs
            </h3>
            <p className="text-gray-500 mb-6">{blogsError}</p>
            <button
              onClick={() => {
                const allIds = (apiCategories || []).map((c) => c._id || c.id);
                dispatch(
                  fetchBlogsByCategory({
                    categoryId: activeCategory.id,
                    categoryIds: allIds,
                    page: 1,
                  }),
                );
              }}
              className="px-6 py-2.5 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {isPageLoading && (
          <>
            {activeCategory.id === null ? (
              <div className="space-y-10">
                {[0, 1].map((ri) => (
                  <div key={ri}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-gray-200 rounded-full animate-pulse" />
                      <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                    <div className="flex gap-4 overflow-hidden">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <SkeletonFeatured />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonGridCard key={i} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ── "ALL" MODE: grouped carousels ── */}
        {!isPageLoading && !blogsError && mode === "all" && (
          <>
            {groupedByCategory.length === 0 ? (
              <div className="text-center py-32">
                <div className="text-7xl mb-5">🗂️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  No blogs have been published yet.
                </p>
              </div>
            ) : (
              groupedByCategory.map((group) => (
                <CategoryRow
                  key={group.categoryId}
                  group={group}
                  categoryName={getCategoryName(group.categoryId)}
                  isLoadingMore={!!categoryLoadingMap[group.categoryId]}
                  onLoadMore={handleLoadMore}
                />
              ))
            )}
          </>
        )}

        {/* ── SINGLE CATEGORY MODE: featured + grid ── */}
        {!isPageLoading && !blogsError && mode === "single" && (
          <>
            {apiBlogs.length === 0 ? (
              <div className="text-center py-32">
                <div className="text-7xl mb-5">🗂️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500 mb-6">
                  There are no posts in <strong>{activeCategory.label}</strong>{" "}
                  yet.
                </p>
              </div>
            ) : (
              <>
                {/* Featured card */}
                {featuredBlog && (
                  <article
                    onClick={() => navigateToBlog(featuredBlog)}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 mb-12 border border-gray-100 cursor-pointer"
                  >
                    <div className="grid md:grid-cols-2 min-h-[360px]">
                      <div className="relative overflow-hidden min-h-[240px] md:min-h-0">
                        {featuredBlog.image ? (
                          <img
                            src={featuredBlog.image}
                            alt={featuredBlog.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-6xl opacity-30">
                              📝
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        {featuredBlog.categoryId?.name && (
                          <span className="absolute top-5 right-5 text-xs font-bold bg-white/90 text-orange-600 rounded-full px-3 py-1.5 shadow">
                            {featuredBlog.categoryId.name}
                          </span>
                        )}
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        {featuredBlog.categoryId?.name && (
                          <span className="inline-block text-xs font-bold bg-orange-100 text-orange-600 rounded-full px-3 py-1 mb-4 w-fit">
                            {featuredBlog.categoryId.name}
                          </span>
                        )}
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 group-hover:text-orange-600 transition-colors duration-300">
                          {featuredBlog.title}
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                          {featuredBlog.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center ring-2 ring-orange-200 text-white text-sm font-bold flex-shrink-0">
                              {getInitials(featuredBlog.author)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {featuredBlog.author}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDate(featuredBlog.createdAt)}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-300">
                            Read
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {/* Grid */}
                {restBlogs.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {restBlogs.map((blogItem, index) => (
                      <article
                        key={blogItem._id}
                        onClick={() => navigateToBlog(blogItem)}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer blog-card"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <div className="relative overflow-hidden h-52">
                          {blogItem.image ? (
                            <img
                              src={blogItem.image}
                              alt={blogItem.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                              <span className="text-white text-5xl opacity-30">
                                📝
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {blogItem.categoryId?.name && (
                            <span className="absolute top-3.5 left-3.5 text-xs font-bold bg-orange-500 text-white rounded-full px-3 py-1 shadow">
                              {blogItem.categoryId.name}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center ring-2 ring-orange-100 text-white text-xs font-bold flex-shrink-0">
                              {getInitials(blogItem.author)}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-800">
                                {blogItem.author}
                              </p>
                              <p className="text-[11px] text-gray-400">
                                {formatDate(blogItem.createdAt)}
                              </p>
                            </div>
                          </div>
                          <h2 className="text-base font-black text-gray-900 mb-2.5 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                            {blogItem.title}
                          </h2>
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                            {blogItem.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToBlog(blogItem);
                              }}
                              className="inline-flex cursor-pointer items-center gap-1.5 text-orange-500 font-bold text-sm group-hover:gap-2.5 transition-all duration-300"
                            >
                              Read More
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>

      <style>{`
        @keyframes blog-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .blog-card { animation: blog-in 0.45s ease-out both; }
        .hero-img-placeholder {
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%) !important;
          border: 2px dashed rgba(255,255,255,0.4) !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        .hero-img-placeholder::after {
          content: "📷  Add your image here";
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-weight: 600;
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Blog;
