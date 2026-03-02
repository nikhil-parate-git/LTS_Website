import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Subscriptions from "../pages/Subscriptions";
import MainLayout from "../components/Layouts/MainLayout";
import About from "../pages/modules/about and contact/About";
import Contact from "../pages/modules/about and contact/Contact";
import TopCategoryDetails from "../pages/modules/topcategorycity/TopCategoryDetails";
import BusinessPage from "../pages/modules/businesslisting/BusinessPlans";
import SubmitEnquiry from "../pages/modules/trendingcategories/SubmitEnquiry";

const Home = lazy(() => import("../pages/modules/home/Home"));
const Category = lazy(
  () => import("../pages/modules/trendingcategories/CategoriesDetails"),
);
const SubCategory = lazy(
  () => import("../pages/modules/trendingcategories/Categories"),
);
const Details = lazy(
  () => import("../pages/modules/trendingcategories/CategoriesInfo"),
);
export default function PublicRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subcategory/:slug" element={<SubCategory />} />
        <Route path="/business/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/submitenquiry" element={<SubmitEnquiry />} />

       <Route path="/top-category/:slug" element={<TopCategoryDetails />} />
      <Route path="/business" element={<BusinessPage />} />


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
  );
}
