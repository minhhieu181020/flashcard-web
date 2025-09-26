import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ thêm dòng này
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import FlashcardDetail from "./pages/FlashcardDetail/FlashcardDetail";
import CreateFlashcard from "./pages/CreateFlashcard/CreateFlashcard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/flashcards/:title" element={<FlashcardDetail />} />
        <Route path="/createFlashcard" element={<CreateFlashcard mode="create" />} />
        <Route path="/editFlashcard/:title" element={<CreateFlashcard mode="edit" />} />
      </Routes>
    </Router>
  );
}

export default App;
