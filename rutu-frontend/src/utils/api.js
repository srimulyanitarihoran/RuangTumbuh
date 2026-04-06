import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk otomatis menyisipkan token JWT ke setiap request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor untuk menangani response, terutama untuk kasus 401 Unauthorized
api.interceptors.response.use(
  (response) => {
    // Jika API sukses, langsung kembalikan datanya saja biar komponen gak ribet
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token tidak valid atau kadaluarsa!
      console.warn("Sesi berakhir, silakan login ulang.");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.replace("/login"); // Paksa kembali ke halaman login
    }
    return Promise.reject(error);
  },
);

export default api;
