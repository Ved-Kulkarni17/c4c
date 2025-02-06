import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from "./pages/Dash";
import Home from "./pages/Home"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dash" element={<Dash />} />
      </Routes>
    </Router>
  );
}
