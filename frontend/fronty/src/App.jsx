import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from "./pages/Dash";
import Home from "./pages/Home";
import Custom from "./pages/Custom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/Custom" element={<Custom />} />
      </Routes>
    </Router>
  );
}
