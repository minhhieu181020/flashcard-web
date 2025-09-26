import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listFlashcard } from "../../services/studyService";
import "./FlashcardDetail.css";
import Sidebar from "../../components/Sidebar";

function FlashcardDetail() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await listFlashcard(title);
        // data = array of flashcard objects; tìm object khớp title
        const found = Array.isArray(data) ? data.find((s) => s.title === title) : null;
        setStudy(found || (Array.isArray(data) && data[0]) || null);
        setIndex(0);
        setFlipped(false);
      } catch (err) {
        console.error("Lỗi khi gọi listFlashcard:", err);
        setStudy(null);
      } finally {
        setLoading(false);
      }
    }
    if (title) fetch();
  }, [title]);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        window.speechSynthesis.cancel();
        synthRef.current = null;
      }
    };
  }, []);

  if (loading) return <div className="fd-loading">Đang tải flashcards...</div>;
  if (!study) return <div className="fd-loading">Không tìm thấy bộ từ: {title}</div>;

  const terms = Array.isArray(study.terms) ? study.terms : [];
  const total = terms.length;
  const current = terms[index] || { term: "", meaning: "" };

  function next() {
    if (total === 0) return;
    setIndex((i) => (i + 1) % total);
    setFlipped(false);
  }

  function prev() {
    if (total === 0) return;
    setIndex((i) => (i - 1 + total) % total);
    setFlipped(false);
  }

  function goto(i) {
    if (i < 0 || i >= total) return;
    setIndex(i);
    setFlipped(false);
  }

  function speak(text) {
    if (!text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      u.lang = "en-US";
      synthRef.current = u;
      setIsPlaying(true);
      u.onend = () => {
        setIsPlaying(false);
        synthRef.current = null;
      };
      u.onerror = () => {
        setIsPlaying(false);
        synthRef.current = null;
      };
      window.speechSynthesis.speak(u);
    } catch (err) {
      console.error("Speech error:", err);
      setIsPlaying(false);
    }
  }

  // Chỉnh sửa toàn bộ bộ từ (nút "+ Thêm hoặc xóa thuật ngữ")
  const handleEdit = () => {
    // truyền study (object) sang màn CreateFlashcard theo mode "edit"
    navigate("/createFlashcard", {
      state: { mode: "edit", flashcard: study },
    });
  };

  // Chỉnh sửa 1 term cụ thể -> mở màn edit và highlight term
  const handleEditTerm = (termIndex) => {
    navigate("/createFlashcard", {
      state: { mode: "edit", flashcard: study, editIndex: termIndex },
    });
  };

  return (
    <Sidebar>
    <div className="fd-root">
      <div className="fd-inner">
        <header className="fd-header">
          <div className="fd-breadcrumb">📁 {study.category}</div>
          <h1 className="fd-title">{study.title}</h1>
          {study.description && <div className="fd-desc">{study.description}</div>}
        </header>

        <div className="fd-viewer-wrap">
          <div
            className={`fd-big-card ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped((f) => !f)}
          >
            <div className="fd-card-inner">
              <div className="fd-card-face front">
                <div className="fd-card-icons">
                  <button title="Sao" className="icon-btn">☆</button>
                  <button
                    title="Loa"
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(current.term);
                    }}
                  >
                    🔊
                  </button>
                </div>
                <div className="fd-card-content">
                  <div className="fd-term">{current.term}</div>
                </div>
              </div>

              <div className="fd-card-face back">
                <div className="fd-card-content">
                  <div className="fd-meaning">{current.meaning}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="fd-controls">
            <button className="ctrl circle" onClick={prev} aria-label="previous">◀</button>
            <div className="ctrl-index">{index + 1} / {total}</div>
            <button className="ctrl circle" onClick={next} aria-label="next">▶</button>

            <div className="ctrl-spacer" />

            <button className="ctrl action primary" onClick={() => speak(current.term)}>
              🔊 Phát
            </button>
          </div>
        </div>

        <section className="fd-term-list">
          {terms.map((t, i) => (
            <div key={t._id ?? i} className="fd-term-item" onDoubleClick={() => goto(i)}>
              <div className="fd-term-left">
                <strong>{t.term}</strong>
              </div>
              <div className="fd-term-right">
                <p className="fd-meaning">{t.meaning}</p>
                <div className="fd-term-actions">
                  <button className="icon-btn" title="Phát âm" onClick={() => speak(t.term)}>🔊</button>
                  <button className="icon-btn" title="Chỉnh sửa" onClick={() => handleEditTerm(i)}>✏️</button>
                </div>
              </div>
            </div>
          ))}

          <div className="fd-term-footer">
            <button className="fd-edit-terms-btn" onClick={handleEdit}>
              + Thêm hoặc xóa thuật ngữ
            </button>
          </div>
        </section>
      </div>
    </div>
    </Sidebar>
  );
}

export default FlashcardDetail;
