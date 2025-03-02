import { defineStore } from "pinia";
import apiClient from "../services/axiosInstance";

export const useContentStore = defineStore("content", {
  state: () => ({
    contents: [],
  }),
  actions: {
    // Fungsi tambah content
    async addContent(contentData) {
      try {
        const response = await apiClient.post("/content/add", contentData);
        return response.data; // Kembalikan data dari API
      } catch (error) {
        console.error("Error adding content:", error);
        throw error; // Throw error bray tong poho meh apal error na
      }
    },

    // Fungsi untuk mengambil semua konten dari backend
    async fetchContents() {
      try {
        console.log("Fetching contents from API..."); // Logging awal

        const response = await apiClient.get("/content/all");
        console.log("API response:", response.data); // Logging respons dari backend

        if (!Array.isArray(response.data.data)) {
          throw new Error("Expected an array but got something else");
        }

        this.contents = response.data.data; // Simpan data ke state
      } catch (error) {
        console.error("Error fetching contents:", error.message); // Logging error
        throw error;
      }
    },

    // Fungsi untuk menghapus konten berdasarkan ID
    async deleteContent(contentId) {
      try {
        const response = await apiClient.delete(`/content/delete/${contentId}`);
        return response.data; // Kembalikan data dari API
      } catch (error) {
        console.error("Error deleting content:", error);
        throw error; // Throw error bray tong poho meh apal error na
      }
    },
  },
});
