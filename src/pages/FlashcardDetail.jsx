import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FlashcardDetail.css";
import { listFlashcard } from "../services/studyService"; // import service

function FlashcardDetail() {
  const { title } = useParams(); // lấy param từ route
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        console.log("🔍 Gọi API /listFlashcard với title:", title);
        const data = await listFlashcard(title);
        setFlashcards(data);

        console.log("✅ API trả về:", res.data);
      } catch (error) {
        console.error("❌ Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, [title]);

  if (loading) {
    return <div className="text-center mt-10">Đang tải flashcards...</div>;
  }

  return (
    <div className="flashcard-detail-container">
      <header className="detail-header">
        <h1>{title}</h1>
        <p>{flashcards.length} từ vựng</p>
      </header>

      <section className="flashcard-grid">
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard-card">
            <h3 className="word">{card.word}</h3>
            <p className="meaning">{card.meaning}</p>
            <p className="description">{card.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FlashcardDetail;
