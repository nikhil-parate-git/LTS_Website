// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Subscriptions from "../pages/modules/subscription/index";
// import MainLayout from "../components/Layouts/MainLayout";
// import About from "../pages/modules/about and contact/About";
// import Contact from "../pages/modules/about and contact/Contact";
// import TopCategoryDetails from "../pages/modules/topcategorycity/TopCategoryDetails";
// import BusinessPage from "../pages/modules/businesslisting/BusinessPlans";
// import SubmitEnquiry from "../pages/modules/trendingcategories/SubmitEnquiry";
// import PaymentSuccessMessage from "../pages/modules/subscription/PaymentSuccessMessage";
// import Blog from "../pages/modules/blog/Blog";
// import BlogView from "../pages/modules/blog/BlogView";
// import NavServices from "../pages/modules/navservices/NavServices";

// const Home = lazy(() => import("../pages/modules/home/Home"));
// const CategoryDetails = lazy(
//   () => import("../pages/modules/trendingcategories/CategoriesDetails"),
// );
// const SubCategory = lazy(
//   () => import("../pages/modules/trendingcategories/Categories"),
// );
// const Details = lazy(
//   () => import("../pages/modules/trendingcategories/CategoriesInfo"),
// );

// export default function PublicRoute() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/category/:slug" element={<CategoryDetails />} />
//         <Route path="/subscriptions" element={<Subscriptions />} />
//         <Route
//           path="/subscriptions/success"
//           element={<PaymentSuccessMessage />}
//         />
//         <Route path="/subcategory/:slug" element={<SubCategory />} />
//         <Route path="/business/:id" element={<Details />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/submitenquiry" element={<SubmitEnquiry />} />
//         <Route path="/top-category/:slug" element={<TopCategoryDetails />} />
//         <Route path="/business" element={<BusinessPage />} />

//         <Route
//           path="/service/:categorySlug/:subcategorySlug"
//           element={<CategoryDetails />}
//         />

//         <Route path="/blog" element={<Blog />} />
//         <Route path="/blog/:categoryId/:blogId" element={<BlogView />} />
//         <Route path="/navservice" element={<NavServices />} />

//         <Route
//           path="*"
//           element={
//             <div className="flex items-center justify-center h-screen text-2xl text-gray-500">
//               404 - Page Not Found
//             </div>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// }


import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";

const Home = lazy(() => import("../pages/modules/home/Home"));
const CategoryDetails = lazy(() => import("../pages/modules/trendingcategories/CategoriesDetails"));
const SubCategory = lazy(() => import("../pages/modules/trendingcategories/Categories"));
const Details = lazy(() => import("../pages/modules/trendingcategories/CategoriesInfo"));
const Subscriptions = lazy(() => import("../pages/modules/subscription/index"));
const PaymentSuccessMessage = lazy(() => import("../pages/modules/subscription/PaymentSuccessMessage"));
const About = lazy(() => import("../pages/modules/about and contact/About"));
const Contact = lazy(() => import("../pages/modules/about and contact/Contact"));
const TopCategoryDetails = lazy(() => import("../pages/modules/topcategorycity/TopCategoryDetails"));
const BusinessPage = lazy(() => import("../pages/modules/businesslisting/BusinessPlans"));
const SubmitEnquiry = lazy(() => import("../pages/modules/trendingcategories/SubmitEnquiry"));
const Blog = lazy(() => import("../pages/modules/blog/Blog"));
const BlogView = lazy(() => import("../pages/modules/blog/BlogView"));
const NavServices = lazy(() => import("../pages/modules/navservices/NavServices"));

// --- LOADER ---
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

export default function PublicRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/*
            cateId = CAT-004
            slug = electrician-service (SEO)
            URL: /subcategory/CAT-004/electrician-service
          */}
          <Route path="/subcategory/:cateId/:slug" element={<SubCategory />} />

          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/success" element={<PaymentSuccessMessage />} />

          {/*
            subCateId = SUBCAT-001
            URL: /service/SUBCAT-001/bed-bug-control-service
          */}
          {/* <Route path="/service/:subCateId/:subcategorySlug" element={<CategoryDetails />} /> */}

          
<Route path="/service/:city/:subCateId/:subcategorySlug" element={<CategoryDetails />} />

          <Route path="/business/:city/:venId/:slug" element={<Details />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submitenquiry" element={<SubmitEnquiry />} />
          <Route path="/top-category/:slug" element={<TopCategoryDetails />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:categoryId/:blogId" element={<BlogView />} />
          <Route path="/navservice" element={<NavServices />} />

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-2xl text-gray-500">
                404 - Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}