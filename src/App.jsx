import React from "react";
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
