import api from "./api";

export async function getStudies() {
  const res = await api.get("/listStudy");
  return res.data;
}

export async function getFlashcards(title) {
  const res = await api.post("/listFlashcard", { title });
  return res.data;
}

export async function createFlashcard(data) {
  const res = await api.post("/createFlashcard", data);
  return res.data;
}

export async function updateFlashcard(title, data) {
  const res = await api.put(`/updateFlashcard/${title}`, data);
  return res.data;
}

export async function deleteStudy(title) {
  const res = await api.delete(`/deleteStudy/${title}`);
  return res.data;
}
