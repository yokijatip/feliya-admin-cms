import { defineStore } from "pinia";

export const useContentStore = defineStore("content", {
  state: () => ({
    content: [
      {
        id: 1,
        judul: "Artikel Pertama",
        kategori: "artikel",
        deskripsi:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        kontenLengkap:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        gambar: "/path/to/image1.jpg",
      },
      {
        id: 2,
        judul: "Berita Terbaru",
        kategori: "berita",
        deskripsi:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        kontenLengkap:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco...",
        gambar: "/path/to/image2.jpg",
      },
    ],
    loading: false,
    error: null,
  }),

  actions: {
    async getAllContent() {
      this.loading = true;

      try {
        // Lakukan permintaan ke API untuk mendapatkan semua konten
        // Untuk sekarang mah ngembalaiin return state aja
        return [...this.content];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getContentById(id) {
      // permintaan ke API untuk mendapatkan konten berdasarkan ID
      try {
        // Find content by Id
        const content = this.content.find((item) => item.id === parseInt(id));
        if (!content) throw new Error("Content not found");
        return { ...content };
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async addContent(contentData) {
      this.loading = true;
      try {
        // Generate new ID (in a reak app, the backend would handle this)
        const newId = Math.max(0, ...this.contents.map((item) => item.id)) + 1;

        // Add new content
        // Handle file upload (in a real app, you'd upload to server)
        let imagePath = null;
        if (contentData.gambar instanceof File) {
          imagePath = URL.createObjectURL(contentData.gambar);
        }

        const newContent = {
          id: newId,
          judul: contentData.judul,
          kategori: contentData.kategori,
          deskripsi: contentData.deskripsi,
          kontenLengkap: contentData.kontenLengkap,
          gambar: imagePath,
        };

        this.contents.push(newContent);
        return newContent;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },

  async updateContent(id, contentData) {
    this.loading = true;
    try {
      // Find content index
      const index = this.contents.findIndex((item) => item.id === parseInt(id));
      if (index === -1) throw new Error("Content not found");

      // Handle file upload (in a real app, you'd upload to server)
      let imagePath = contentData.gambar;
      if (contentData.gambar instanceof File) {
        // Mock image upload - in a real app you'd upload to server
        imagePath = URL.createObjectURL(contentData.gambar);
      }

      // Update content
      const updatedContent = {
        ...this.contents[index],
        judul: contentData.judul,
        kategori: contentData.kategori,
        deskripsi: contentData.deskripsi,
        kontenLengkap: contentData.kontenLengkap,
        gambar: imagePath,
      };

      this.contents[index] = updatedContent;
      return updatedContent;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  },

  async deleteContent(id) {
    this.loading = true;
    try {
      const index = this.contents.findIndex((item) => item.id === parseInt(id));
      if (index === -1) throw new Error("Content not found");

      this.contents.splice(index, 1);
      return { success: true };
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  },
});
