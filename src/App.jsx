import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Social from "./pages/Social";
import Plants from "./pages/Plants";
import FirestoreTest from "./components/FirestoreTest";

export default function App() {
  return (
    <Router>
      <div>
        <h1>My App</h1>
        <FirestoreTest />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/social" element={<Social />} />
          <Route path="/plants" element={<Plants />} />
        </Routes>
      </div>
    </Router>
  );
}