import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ thêm dòng này
import HomeScreen from "./pages/HomeScreen";
import FlashcardDetail from "./pages/FlashcardDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/flashcards/:title" element={<FlashcardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
