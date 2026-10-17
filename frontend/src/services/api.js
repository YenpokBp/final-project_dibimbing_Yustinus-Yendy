import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Setiap request otomatis membawa token kalau ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Token kedaluwarsa/tidak valid: bersihkan sesi dan kembali ke login.
// Endpoint /auth dikecualikan agar pesan "email atau password salah" tetap tampil.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRoute = err.config?.url?.includes("/auth/");
    if (err.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// Ambil pesan error dari format { message, errors } milik backend
export const getErrorMessage = (err) => {
  const data = err.response?.data;
  if (data?.errors?.length) return data.errors.map((e) => e.message).join(" ");
  return data?.message || "Tidak dapat terhubung ke server.";
};

export default api;
