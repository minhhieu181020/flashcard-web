import React, { useState, useEffect, useRef } from "react";
import "./CreateFlashcard.css";
import { createFlashcard, updateFlashcard } from "../../services/studyService";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function CreateFlashcard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { flashcard, mode = "create", editIndex = null } = location.state || {};

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState([{ term: "", meaning: "" }]);

  // refs để focus / scroll tới term khi editIndex có giá trị
  const termRefs = useRef([]);

  useEffect(() => {
    if (mode === "edit" && flashcard) {
      setFormTitle(flashcard.title || "");
      setDescription(flashcard.description || "");
      setTerms(Array.isArray(flashcard.terms) && flashcard.terms.length ? flashcard.terms.map(t => ({ term: t.term, meaning: t.meaning })) : [{ term: "", meaning: "" }]);
    }
  }, [mode, flashcard]);

  useEffect(() => {
    // nếu editIndex được truyền thì focus vào ô tương ứng sau khi DOM render
    if (mode === "edit" && editIndex !== null && termRefs.current[editIndex]) {
      termRefs.current[editIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      // focus vào input term
      const inputTerm = termRefs.current[editIndex].querySelector(".cf-term-input");
      if (inputTerm) inputTerm.focus();
    }
  }, [mode, editIndex, terms]);

  const addTerm = () => setTerms([...terms, { term: "", meaning: "" }]);
  const removeTerm = (index) => setTerms(terms.filter((_, i) => i !== index));

  const handleTermChange = (index, value) => {
    const updated = [...terms];
    updated[index] = { ...updated[index], term: value };
    setTerms(updated);
  };

  const handleMeaningChange = (index, value) => {
    const updated = [...terms];
    updated[index] = { ...updated[index], meaning: value };
    setTerms(updated);
  };

  const suggestMeaning = async (index, term) => {
    if (!term) return;
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(term)}`);
      const data = await res.json();
      if (data.translation) {
        setTerms(prev => {
          const copy = [...prev];
          if (!copy[index].meaning) copy[index].meaning = data.translation;
          return copy;
        });
      }
    } catch (err) {
      console.error("❌ Lỗi dịch:", err);
    }
  };

  const handleSave = async () => {
    try {
      if (!formTitle || formTitle.trim() === "") {
        alert("Vui lòng nhập tiêu đề");
        return;
      }

      if (mode === "create") {
        await createFlashcard({ title: formTitle, description, terms });
      } else {
        // server expects old title in URL and newTitle in body
        const payload = { newTitle: formTitle, description, category: flashcard?.category || "Tất cả", terms };
        await updateFlashcard(flashcard.title, payload);
      }

      navigate(`/flashcards/${encodeURIComponent(formTitle)}`);
    } catch (error) {
      console.error("❌ Lỗi khi lưu:", error);
      alert("Lỗi khi lưu, xem console để biết chi tiết");
    }
  };

  return (
    <Sidebar>
    <div className="create-flashcard">
      <h2 className="cf-title">{mode === "edit" ? "Chỉnh sửa học phần" : "Tạo một học phần mới"}</h2>

      <input
        type="text"
        className="cf-input"
        placeholder="Tiêu đề"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <textarea
        className="cf-textarea"
        placeholder="Thêm mô tả..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="cf-terms">
        {terms.map((t, i) => (
          <div
            key={i}
            className="cf-term-card"
            ref={(el) => (termRefs.current[i] = el)}
          >
            <div className="cf-term-index">{i + 1}</div>

            <div className="cf-term-fields">
              <input
                type="text"
                className="cf-term-input"
                placeholder="Thuật ngữ (Tiếng Anh)"
                value={t.term}
                onChange={(e) => handleTermChange(i, e.target.value)}
              />
              <input
                type="text"
                className="cf-meaning-input"
                placeholder="Định nghĩa (Tiếng Việt)"
                value={t.meaning}
                onFocus={() => suggestMeaning(i, t.term)}
                onChange={(e) => handleMeaningChange(i, e.target.value)}
              />
            </div>

            <button className="cf-remove-btn" onClick={() => removeTerm(i)} title="Xóa thẻ này">✖</button>
          </div>
        ))}
      </div>

      <button className="cf-add-btn" onClick={addTerm}>+ Thêm thẻ</button>

      <div className="cf-footer">
        <button className="cf-create-btn" onClick={handleSave}>
          {mode === "edit" ? "Cập nhật" : "Tạo"}
        </button>
      </div>
    </div>
    </Sidebar>
  );
}
