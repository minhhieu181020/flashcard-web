import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import { getStudies } from "../../services/studyService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function HomeScreen() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/createFlashcard", {
      state: { mode: "create" },
    });
  };

  useEffect(() => {
    async function fetchStudies() {
      try {
        console.log("🔍 Đang gọi API /listStudy ...");
        const data = await getStudies();
        console.log("✅ API trả về:", data);
        setStudies(data);
      } catch (error) {
        console.error("❌ Lỗi gọi API:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudies();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;
  }

  return (
    <Sidebar>
      <main className="main">
        <header className="main-header">
          <h1>VOL</h1>
          <div className="filter-bar">
            <button className="filter active">Tất cả</button>
            <button className="filter">VOL 1</button>
            <button className="filter">VOL 2</button>
            <button className="filter">VOL 3</button>
            <button className="filter plus">+</button>
          </div>
          <div className="actions">
            <button className="add-btn" onClick={handleCreateClick}>
              + Tài liệu học
            </button>
            <input type="text" placeholder="Tìm kiếm thư mục này" />
          </div>
        </header>

        {/* Study List */}
        <section className="flashcard-list">
          {studies.map((study) => (
            <div
              key={study.id}
              className="flashcard-item"
              onClick={() => navigate(`/flashcards/${study.title}`)}
            >
              <div className="flashcard-info">
                <h3>{study.title}</h3>
                <p>
                  {study.wordCount} từ • {study.subtitle} • Danh mục:{" "}
                  {study.category}
                </p>
              </div>
              <span className="more">…</span>
            </div>
          ))}
        </section>
      </main>
    </Sidebar>
  );
}

export default HomeScreen;
