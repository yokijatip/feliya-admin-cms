<template>
  <ContainerContentView>
    <TopBarContent addRoute="/produk-kami/add"> Konten Layanan </TopBarContent>
    <div class="mt-4">
      <!-- Filter Kategori -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700"
          >Filter Kategori</label
        >
        <select
          v-model="selectedCategory"
          id="category"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Semua Kategori</option>
          <option value="Artikel">Artikel</option>
          <option value="Berita">Berita</option>
          <option value="Produk">Produk</option>
          <option value="Tips dan Trik">Tips dan Trik</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <!-- Tabel Konten -->
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Gambar
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Judul
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Deskripsi
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in filteredContent" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <img
                :src="item.image"
                alt="Gambar Konten"
                class="w-16 h-16 object-cover rounded-md"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.content }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="confirmDelete(item.id)"
                class="text-red-600 hover:text-red-900"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between mt-4">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Sebelumnya
        </button>
        <span class="text-gray-700">Halaman {{ currentPage }}</span>
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          @click="nextPage"
        >
          Berikutnya
        </button>
      </div>
    </div>
  </ContainerContentView>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useContentStore } from "../../store/contentStore";
import ContainerContentView from "../../components/ContainerContentView.vue";
import TopBarContent from "../../components/TopBarContent.vue";

const contentStore = useContentStore();
const selectedCategory = ref("");
const currentPage = ref(1);
const showDeleteModal = ref(false);
const contentToDelete = ref(null);

// Fetch data konten saat komponen dimuat
onMounted(async () => {
  await contentStore.fetchContents();
});

// Filter konten berdasarkan kategori
const filteredContent = computed(() => {
  if (!selectedCategory.value) {
    return contentStore.contents;
  }
  return contentStore.contents.filter(
    (item) => item.category === selectedCategory.value
  );
});

// Pagination
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  currentPage.value++;
}

// Hapus konten
async function confirmDelete(id) {
  contentToDelete.value = id;
  showDeleteModal.value = true;
}

async function deleteContent() {
  try {
    await apiClient.delete(`/content/delete/${contentToDelete.value}`);
    await contentStore.fetchContents(); // Refresh data setelah penghapusan
    showDeleteModal.value = false;
  } catch (error) {
    console.error("Error deleting content:", error);
    alert("Gagal menghapus konten. Silakan coba lagi.");
  }
}
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
