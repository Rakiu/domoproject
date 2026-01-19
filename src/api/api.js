import axios from "axios";

const api = axios.create({
  baseURL: "https://api3.nourishandthrive.in/api",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;
