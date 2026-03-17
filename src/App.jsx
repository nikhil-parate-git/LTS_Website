import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ScrollToTop from "../src/components/Layouts/ScrollableToTop";
import PublicRoute from "./routes/PublicRoute";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Slide}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "white",
          color: "#1f2937",
          fontWeight: "500",
        }}
        progressStyle={{
          backgroundColor: "#f97316",
        }}
      />
      <ScrollToTop />
      <PublicRoute />
    </Router>
  );
}

export default App;
