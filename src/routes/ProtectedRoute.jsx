import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));

// Auth guard component
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function ProtectedRoute() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-orange-500 text-xl">Loading...</div>}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        {/* Add more protected routes below */}
      </Routes>
    </Suspense>
  );
}
 