import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import ScrollToTop from '../src/components/Layouts/ScrollableToTop';
import PublicRoute from "./routes/PublicRoute";


function App() {
  return (
    <Router>
       <ScrollToTop /> 
      <PublicRoute />   
    </Router>
  );
}

export default App;
