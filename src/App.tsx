import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
