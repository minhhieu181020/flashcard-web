import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ⚡ chỉnh port cho khớp backend
});

export default api;
