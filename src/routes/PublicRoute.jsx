// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Subscriptions from "../pages/Subscriptions";
// import Category from "../pages/modules/category/Category";
// import SubCategory from "../pages/modules/category/SubCategory";
// import MainLayout from "../components/Layouts/MainLayout";
// import Details from "../pages/modules/category/Details";
// import About from "../pages/modules/about and contact/About";

// const Home = lazy(() => import("../pages/modules/home/Home"));
// // const SubCategory = lazy(() => import("../pages/SubCategory"));
// // const Category = lazy(()=> import ("../pages/Category"));
// // const Login = lazy(() => import("../pages/Login"));
// // const Register = lazy(() => import("../pages/Register"));

// export default function PublicRoute() {
//   return (
//     <Suspense fallback={<div className="flex items-center justify-center h-screen text-orange-500 text-xl">Loading...</div>}>
//       <Routes>
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/category/:slug" element={<Category />} />
//           <Route path="/subscriptions" element={<Subscriptions/>} />
//           <Route path="/subcategory/:slug" element={<SubCategory />} />
//           <Route path="/business/:id" element={<Details />} />
//         </Route>
//         {/* <Route path="/register" element={<Register />} /> */}
//       </Routes>
//     </Suspense>
//   );
// }


import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Subscriptions from "../pages/Subscriptions";
import Category from "../pages/modules/category/Category";
import SubCategory from "../pages/modules/category/SubCategory";
import MainLayout from "../components/Layouts/MainLayout";
import Details from "../pages/modules/category/Details";
import About from "../pages/modules/about and contact/About";
import Contact from "../pages/modules/about and contact/Contact";

const Home = lazy(() => import("../pages/modules/home/Home"));

export default function PublicRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-orange-500 text-xl">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subcategory/:slug" element={<SubCategory />} />
          <Route path="/business/:id" element={<Details />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}