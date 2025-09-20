import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listFlashcard } from "../services/studyService";
import "./FlashcardDetail.css";

function FlashcardDetail() {
  const { title } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        console.log("🔍 Gọi API /listFlashcard với title:", title);
        const data = await listFlashcard(title);

        // data = [ { title, description, terms: [...] } ]
        const foundStudy = data.find((s) => s.title === title);
        setStudy(foundStudy || null);
      } catch (error) {
        console.error("❌ Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, [title]);

  if (loading) {
    return <div className="loading">Đang tải flashcards...</div>;
  }

  if (!study) {
    return <div className="loading">Không tìm thấy bộ từ {title}</div>;
  }

  return (
    <div className="flashcard-detail-container">
      {/* Header */}
      <header className="detail-header">
        <h1>{study.title}</h1>
        <p>{study.terms.length} thuật ngữ</p>
        {study.description && <p className="description">{study.description}</p>}
      </header>

      {/* Terms list */}
<section className="term-list">
  {study.terms.map((card) => (
    <div key={card._id} className="term-card">
      <div className="term-text">{card.term}</div>
      <div className="meaning-text">{card.meaning}</div>
    </div>
  ))}
</section>

    </div>
  );
}

export default FlashcardDetail;
