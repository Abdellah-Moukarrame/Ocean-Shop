import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = decodeURIComponent(document.cookie.replace('XSRF-TOKEN=', ''));
  config.headers['X-XSRF-TOKEN'] = token; // Corrected this line
  return config;
});

export default api;

