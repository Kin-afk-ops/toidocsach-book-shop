import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN, // 👈 Đổi IP này nếu dùng trên thiết bị thật
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Nếu lỗi là 401 và chưa retry
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tránh nhiều lần gửi /token/refresh
        if (!isRefreshing) {
          isRefreshing = true;
          await axiosInstance.post("/token/refresh");
          isRefreshing = false;
          return axiosInstance(originalRequest); // Gọi lại request cũ
        }
      } catch (refreshError) {
        isRefreshing = false;

        // Nếu refresh cũng lỗi (do không có cookie), thì logout
        console.warn("Refresh token failed. Redirecting to login...");
        // Optional: xóa localStorage/session nếu có
        localStorage.clear(); // nếu bạn dùng để lưu auth
        // Chuyển về trang login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
