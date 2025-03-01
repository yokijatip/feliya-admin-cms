<template>
  <ContainerContentView>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6">
        {{ isEditing ? "Edit Konten" : "Tambah Konten Baru" }}
      </h2>

      <form @submit.prevent="saveContent" class="space-y-6">
        <!-- Judul -->
        <div>
          <label
            for="judul"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Judul</label
          >
          <input
            type="text"
            id="judul"
            v-model="content.judul"
            class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan judul konten"
            required
          />
        </div>

        <!-- Kategori -->
        <div>
          <label
            for="kategori"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Kategori</label
          >
          <select
            id="kategori"
            v-model="content.kategori"
            class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Pilih kategori</option>
            <option value="artikel">Artikel</option>
            <option value="berita">Berita</option>
            <option value="produk">Produk</option>
            <option value="tips">Tips dan Trik</option>
            <option value="tips">Other</option>
          </select>
        </div>

        <!-- Gambar -->
        <div>
          <label
            for="gambar"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Gambar</label
          >
          <div class="flex items-center space-x-4">
            <input
              type="file"
              id="gambar"
              @change="handleImageUpload"
              class="hidden"
              accept="image/*"
            />
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Pilih Gambar
            </button>
            <span v-if="imagePreview" class="text-sm text-gray-500">{{
              imageName
            }}</span>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleImageUpload"
              accept="image/*"
            />
          </div>
          <div v-if="imagePreview" class="mt-3">
            <img
              :src="imagePreview"
              alt="Preview"
              class="h-40 object-contain rounded-md"
            />
          </div>
        </div>

        <!-- Konten Lengkap -->
        <div>
          <label
            for="kontenLengkap"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Konten Lengkap</label
          >
          <textarea
            id="kontenLengkap"
            v-model="content.kontenLengkap"
            rows="10"
            class="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan konten lengkap"
            required
          ></textarea>
        </div>

        <!-- Tombol Submit & Cancel -->
        <div class="flex space-x-4">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-950 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {{ isEditing ? "Update Konten" : "Simpan Konten" }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Batal
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

const router = useRouter();
const route = useRoute();
const contentStore = useContentStore();

// Check if we're editing existing content
const contentId = route.params.id;
const isEditing = computed(() => !!contentId);

// Content form data
const content = ref({
  judul: "",
  kategori: "",
  kontenLengkap: "",
  gambar: null,
});

// Image handling
const imagePreview = ref(null);
const imageName = ref("");

// Load content data if editing
onMounted(async () => {
  if (isEditing.value) {
    try {
      const contentData = await contentStore.getContentById(contentId);
      if (contentData) {
        content.value = { ...contentData };
        if (contentData.gambar) {
          imagePreview.value = contentData.gambar;
          imageName.value = "Current image";
        }
      }
    } catch (error) {
      console.error("Failed to load content:", error);
      // Handle error (show notification, etc.)
    }
  }
});

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageName.value = file.name;
    content.value.gambar = file;

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Save content
const saveContent = async () => {
  try {
    if (isEditing.value) {
      await contentStore.updateContent(contentId, content.value);
    } else {
      await contentStore.addContent(content.value);
    }
    // Redirect to content list after successful save
    router.push("/produk-kami");
  } catch (error) {
    console.error("Failed to save content:", error);
    // Handle error (show notification, etc.)
  }
};

// Cancel form
const cancelForm = () => {
  router.push("/produk-kami");
};
</script>

<style></style>
