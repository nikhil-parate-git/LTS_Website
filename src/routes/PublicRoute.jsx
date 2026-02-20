import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const SubCategory = lazy(() => import("../pages/SubCategory"));
// const Login = lazy(() => import("../pages/Login"));
// const Register = lazy(() => import("../pages/Register"));

export default function PublicRoute() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-orange-500 text-xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<SubCategory />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Suspense>
  );
}