// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTopRightCatSub } from "../../redux/slice/rightSidebar/getTopRightCatSubSlice";
// import { Search, ChevronLeft, MoreHorizontal } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function HamburgerDrawer({ isOpen, onClose }) {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector((state) => state.topRightCatSub);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (isOpen) {
//       dispatch(fetchTopRightCatSub());
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";
//     } else {
//       const scrollY = document.body.style.top;
//       document.body.style.position = "";
//       document.body.style.top = "";
//       if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
//       setSearchTerm("");
//     }

//     // Cleanup function to prevent body getting stuck
//     return () => {
//       document.body.style.position = "";
//       document.body.style.top = "";
//     };
//   }, [isOpen, dispatch]);

//   // 2. useMemo use kiya taaki har render pe data group na ho (Performance Optimization)
//   const groupedData = useMemo(() => {
//     if (!data) return [];
//     const groups = data.reduce((acc, item) => {
//       const catId = item.category._id;
//       if (!acc[catId]) {
//         acc[catId] = {
//           name: item.category.name,
//           icon: item.category.icon,
//           subCategories: [],
//         };
//       }
//       if (!acc[catId].subCategories.includes(item.subCategory.name)) {
//         acc[catId].subCategories.push(item.subCategory.name);
//       }
//       return acc;
//     }, {});
//     return Object.values(groups);
//   }, [data]);

//   const filteredCategories = groupedData.filter((cat) =>
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         aria-hidden="true"
//       />

//       {/* Drawer Container */}
//       <aside // Semantic HTML: aside tag use kiya SEO ke liye
//         className={`fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[600px] lg:w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         aria-label="Categories Menu"
//       >
//         <div className="relative h-full overflow-y-auto px-6 py-8">
//           {/* Header & Search */}
//           <div className="flex items-center gap-2 mb-8">
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               aria-label="Close Menu"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400 transition-all">
//               <Search size={18} className="text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search Category..."
//                 className="flex-1 px-3 text-sm outline-none bg-transparent"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
//               <p className="mt-4 text-gray-500 font-medium">
//                 Fetching Top Categories
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-10">
//               {filteredCategories.length > 0 ? (
//                 filteredCategories.map((cat, index) => (
//                   <section key={index} className="group">
//                     {" "}
//                     {/* Semantic: section used */}
//                     <div className="flex items-center gap-4 mb-4">
//                       <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center p-2.5 overflow-hidden border border-orange-100 group-hover:border-orange-300 transition-all">
//                         <img
//                           src={cat.icon}
//                           alt={`${cat.name} icon`} // Descriptive Alt
//                           className="w-full h-full object-contain"
//                           loading="lazy" // Performance optimization
//                           onError={(e) =>
//                             (e.target.src = "https://via.placeholder.com/50")
//                           }
//                         />
//                       </div>
//                       <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
//                         {cat.name}
//                       </h2>
//                     </div>
//                     <div className="pl-16 flex flex-wrap gap-x-6 gap-y-3">
//                       {cat.subCategories.map((sub, i) => (
//                         <Link // 3. Changed span to Link for SEO crawling
//                           key={i}
//                           to={`/search?q=${sub}`}
//                           onClick={onClose}
//                           className="text-sm text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
//                         >
//                           {sub}
//                         </Link>
//                       ))}
//                       <Link to={`/category/${cat.name}`} onClick={onClose}>
//                         <MoreHorizontal
//                           size={18}
//                           className="text-gray-300 hover:text-orange-500 cursor-pointer"
//                         />
//                       </Link>
//                     </div>
//                   </section>
//                 ))
//               ) : (
//                 <div className="text-center py-10">
//                   <p className="text-gray-400">
//                     No category found matching "{searchTerm}"
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRightCatSub } from "../../redux/slice/rightSidebar/getTopRightCatSubSlice";
import { Search, ChevronLeft, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

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

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [isOpen, dispatch]);

  const groupedData = useMemo(() => {
    if (!data) return [];
    const groups = data.reduce((acc, item) => {
      const catId = item.category._id;
      if (!acc[catId]) {
        acc[catId] = {
          name: item.category.name,
          icon: item.category.icon,
          categoryId: item.category.cateId, // ✅ FIX: cateId (API response match)
          subCategories: [],
        };
      }
      if (
        !acc[catId].subCategories.find((s) => s.name === item.subCategory.name)
      ) {
        acc[catId].subCategories.push({
          name: item.subCategory.name,
          subCategoryId: item.subCategory.subCateId, // ✅ FIX: subCateId (API response match)
        });
      }
      return acc;
    }, {});
    return Object.values(groups);
  }, [data]);

  const filteredCategories = groupedData.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toSlug = (name) =>
    name
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[85%] md:w-[600px] lg:w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Categories Menu"
      >
        <div className="relative h-full overflow-y-auto px-6 py-8">
          {/* Header & Search */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close Menu"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400 transition-all">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search Category..."
                className="flex-1 px-3 text-sm outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-500 font-medium">
                Fetching Top Categories
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <section key={index} className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center p-2.5 overflow-hidden border border-orange-100 group-hover:border-orange-300 transition-all">
                        <img
                          src={cat.icon}
                          alt={`${cat.name} icon`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/50")
                          }
                        />
                      </div>
                      <Link
                        to={`/category/${cat.categoryId}`}
                        onClick={onClose}
                        className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </div>

                    <div className="pl-16 flex flex-wrap gap-x-6 gap-y-3">
                      {cat.subCategories.map((sub, i) => (
                        <Link
                          key={i}
                          to={`/service/${cat.categoryId}/${sub.subCategoryId}/nagpur/${toSlug(sub.name)}`}
                          onClick={onClose}
                          className="text-sm text-gray-500 hover:text-orange-500 cursor-pointer transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                      <Link
                        to={`/category/${cat.categoryId}`}
                        onClick={onClose}
                      >
                        <MoreHorizontal
                          size={18}
                          className="text-gray-300 hover:text-orange-500 cursor-pointer"
                        />
                      </Link>
                    </div>
                  </section>
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
      </aside>
    </>
  );
}
