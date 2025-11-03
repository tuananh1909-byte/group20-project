// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000", // BE của bạn
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// (tuỳ chọn) interceptor để gắn token sau này
axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // gom lỗi về 1 chỗ
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Có lỗi xảy ra khi gọi API";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
