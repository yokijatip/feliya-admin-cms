<template>
  <ContainerContentView>
    <h1 class="text-2xl font-bold mb-4">Tambah Konten Produk</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Input Judul -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Judul</label
          >
          <input
            v-model="formData.title"
            type="text"
            id="title"
            placeholder="Masukkan judul"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Input Kategori -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Kategori</label
          >
          <select
            v-model="formData.category"
            id="category"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Pilih kategori</option>
            <option value="Artikel">Artikel</option>
            <option value="Berita">Berita</option>
            <option value="Produk">Produk</option>
            <option value="Tips dan Trik">Tips dan Trik</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <!-- Input Gambar -->
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700"
            >Gambar</label
          >
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p v-if="imageName" class="mt-2 text-sm text-gray-500">
            Nama Gambar: {{ imageName }}
          </p>
        </div>

        <!-- Input Konten Lengkap -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700"
            >Konten Lengkap</label
          >
          <textarea
            v-model="formData.content"
            id="content"
            rows="6"
            placeholder="Masukkan konten lengkap"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <!-- Tombol Batal dan Simpan -->
        <div class="flex justify-between">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ isSubmitting ? "Menyimpan..." : "Simpan" }}
          </button>
        </div>
      </form>
    </div>
  </ContainerContentView>
</template>

<script setup>
import ContainerContentView from "../../../components/ContainerContentView.vue";

import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useContentStore } from "../../../store/contentStore";
import { uploadImageToCloudinary } from "../../../services/cloudinaryService";
import apiClient from "../../../services/axiosInstance";

// Content form data
const formData = ref({
  title: "",
  category: "",
  image: "",
  content: "",
});

// State tambahan
const imageName = ref("");
const isSubmitting = ref(false);
const router = useRouter();
const contentStore = useContentStore();

// Handle image upload
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Tidak ada file yang dipilih.");
    return;
  }

  console.log("File terpilih:", file);

  try {
    const imageUrl = await uploadImageToCloudinary(file);
    formData.value.image = imageUrl;
    imageName.value = file.name;
  } catch (error) {
    alert("Gagal mengupload gambar. Silakan coba lagi.");
  }
}

// Handle Submit Form
async function handleSubmit() {
  if (
    !formData.value.title ||
    !formData.value.category ||
    !formData.value.image ||
    !formData.value.content
  ) {
    alert("Harap lengkapi semua field.");
    return;
  }

  try {
    isSubmitting.value = true;

    // Kirim data ke backend
    const response = await apiClient.post("/content/add", formData.value);

    // Logging respons dari backend
    console.log("Konten berhasil ditambahkan:", response.data);

    // Redirect ke halaman dashboard setelah berhasil
    router.push("/produk-kami");
  } catch (error) {
    console.error("Error saat menambahkan konten:", error);
    alert("Gagal menambahkan konten. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
}

// Reset form
function resetForm() {
  formData.value = {
    title: "",
    category: "",
    image: "",
    content: "",
  };
  imageName.value = "";
}

// Cancel form
const cancelForm = () => {
  router.push("/produk-kami");
};
</script>

<style></style>
