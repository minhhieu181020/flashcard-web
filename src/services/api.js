import axios from "axios";

const api = axios.create({
  baseURL: "https://flashcard-backend-0dwg.onrender.com", // ⚡ chỉnh port cho khớp backend
});

export default api;
