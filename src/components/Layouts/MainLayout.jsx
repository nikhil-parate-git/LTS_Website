import Navbar from "../nav/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* NO max-w or padding here — each section handles its own width */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
