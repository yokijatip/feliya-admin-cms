import { defineStore } from "pinia";
import apiClient from "../services/axiosInstance";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false, // State untuk Loading
    authToken: localStorage.getItem("authToken") || null, // Ambil token dari localStorage langsung jika ada
    errorMessage: "", // Pesan kesalahan
  }),
  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await apiClient.post("/auth/login", credentials); // Menggunakan instance dari axiosInstance
        console.log("API Response:", response); // Debugging respon API

        // Pastikan token ada di respon
        if (
          !response.data ||
          !response.data.data ||
          !response.data.data.token
        ) {
          throw new Error("Token tidak ditemukan di respon API.");
        }

        this.authToken = response.data.data.token; // Akses token dari nested properti
        localStorage.setItem("authToken", this.authToken); // Menyimpan token di localStorage
      } catch (error) {
        console.error("Login error:", error); // Debugging error
        this.errorMessage = "Login gagal. Periksa email dan password anda.";
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      this.authToken = null;
      localStorage.removeItem("authToken"); // Hapus token dari local storage
    },
  },
});
