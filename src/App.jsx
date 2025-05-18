import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Social from "./pages/Social";
import Plants from "./pages/Plants";
import Leaderboard from "./pages/Leaderboard";
import FirestoreTest from "./components/FirestoreTest";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>  11  
          <Route path="/" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}
