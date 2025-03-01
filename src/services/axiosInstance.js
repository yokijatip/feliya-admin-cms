import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Mengambil API dari env
  headers: {
    "Content-Type": "application/json", // Mengatur header Content-Type
  },
});

// Interceptor untuk request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Tangani error pada request
  }
);

// Interceptor untuk response
apiClient.interceptors.response.use(
  (response) => {
    return response; // Kembalikan response jika berhasil
  },
  (error) => {
    if (error.response) {
      // Tangani error berdasarkan status code
      const { status } = error.response;
      if (status === 401) {
        console.error(
          "Unauthorized: Token mungkin kedaluwarsa atau tidak valid."
        );
        // Redirect ke halaman login atau refresh token
      } else if (status === 404) {
        console.error("Resource not found.");
      } else if (status >= 500) {
        console.error("Server error. Silakan coba lagi nanti.");
      }
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error); // Kembalikan error untuk ditangani di komponen
  }
);

export default apiClient;
