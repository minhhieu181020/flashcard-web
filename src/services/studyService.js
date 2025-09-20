import api from "./api"; // axios instance (đã config sẵn baseURL)

// Lấy toàn bộ Study
export async function getStudies() {
  const res = await api.get("/listStudy");
  return res.data;
}

// Lấy flashcards theo title
export async function listFlashcard(title) {
  const res = await api.post("/listFlashcard", { title });
  return res.data;
}

// Tạo flashcard mới
export async function createFlashcard(data) {
  const res = await api.post("/createFlashcard", data);
  return res.data;
}

// Cập nhật flashcard theo title
export async function updateFlashcard(title, data) {
  const res = await api.put(`/updateFlashcard/${title}`, data);
  return res.data;
}

// Xoá study theo title
export async function deleteStudy(title) {
  const res = await api.delete(`/deleteStudy/${title}`);
  return res.data;
}
