import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";

const Home = lazy(() => import("../pages/modules/home/Home"));
const SubCategory = lazy(
  () => import("../pages/modules/trendingcategories/Categories"),
);
const CategoryDetails = lazy(
  () => import("../pages/modules/trendingcategories/CategoriesDetails"),
);
const Details = lazy(
  () => import("../pages/modules/trendingcategories/CategoriesInfo"),
);
const Subscriptions = lazy(() => import("../pages/modules/subscription/index"));
const PaymentSuccessMessage = lazy(
  () => import("../pages/modules/subscription/PaymentSuccessMessage"),
);
const About = lazy(() => import("../pages/modules/about and contact/About"));
const Contact = lazy(
  () => import("../pages/modules/about and contact/Contact"),
);
const TopCategoryDetails = lazy(
  () => import("../pages/modules/topcategorycity/TopCategoryDetails"),
);
const BusinessPage = lazy(
  () => import("../pages/modules/businesslisting/BusinessPlans"),
);
const SubmitEnquiry = lazy(
  () => import("../pages/modules/trendingcategories/SubmitEnquiry"),
);
const Blog = lazy(() => import("../pages/modules/blog/Blog"));
const BlogView = lazy(() => import("../pages/modules/blog/BlogView"));
const NavServices = lazy(
  () => import("../pages/modules/navservices/NavServices"),
);

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-gray-100 border-t-orange-500 rounded-full animate-spin" />
  </div>
);

export default function PublicRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/*
            /subcategory/CAT-001/pest-control-service
            cateId = "CAT-001"  ✅ readable backend ID
          */}
          <Route path="/subcategory/:cateId/:slug" element={<SubCategory />} />

          {/*
            /service/nagpur/SUBCAT-001/bed-bug-control-service
          */}
          {/* <Route path="/service/:city/:subCateId/:subcategorySlug" element={<CategoryDetails />} /> */}
          <Route
            path="/service/:catId/:subCateId/:city/:subcategorySlug"
            element={<CategoryDetails />}
          />

          {/*
            /business/nagpur/VEN-001/abc-services
          */}
          <Route path="/business/:city/:venId/:slug" element={<Details />} />

          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route
            path="/subscriptions/success"
            element={<PaymentSuccessMessage />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/submitenquiry" element={<SubmitEnquiry />} /> */}
          <Route
            path="/submitenquiry/:catId/:subCateId"
            element={<SubmitEnquiry />}
          />
          {/* <Route path="/top-category/:slug" element={<TopCategoryDetails />} /> */}
          <Route
            path="/top-category/:cateId/:slug"
            element={<TopCategoryDetails />}
          />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/blog/:categoryId/:blogId" element={<BlogView />} /> */}
          <Route path="/blog/:categorySlug/:blogId" element={<BlogView />} />
          <Route path="/navservice" element={<NavServices />} />

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-2xl text-gray-500">
                404 – Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
