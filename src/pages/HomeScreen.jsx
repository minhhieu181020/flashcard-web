import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import { getStudies } from "../services/studyService"; // import service

function HomeScreen() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchStudies() {
    try {
      console.log("🔍 Đang gọi API /listStudy ...");
      const data = await getStudies(); 
      console.log("✅ API trả về:", data); // log response
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
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Trang chủ</li>
          <li>Thư viện của bạn</li>
          <li>Thông báo</li>
          <li>Speaking</li>
          <li className="active">VOL</li>
          <li>IELTS Cambridge</li>
          <li>Lớp mới</li>
        </ul>
        <div className="teacher-tools">
          <p>Công cụ của giáo viên</p>
          <li>Giao hoạt động</li>
        </div>
      </aside>

      {/* Main */}
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
            <button className="add-btn">+ Tài liệu học</button>
            <input type="text" placeholder="Tìm kiếm thư mục này" />
          </div>
        </header>

        {/* Study List */}
        <section className="flashcard-list">
          {studies.map((study) => (
            <div key={study.id} className="flashcard-item">
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
    </div>
  );
}

export default HomeScreen;
