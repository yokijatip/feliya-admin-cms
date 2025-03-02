<script setup>
import ContainerContentView from "../../components/ContainerContentView.vue";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useContentStore } from "../../store/contentStore";

const contentStore = useContentStore();
const router = useRouter();

// Search dan filter
const searchQuery = ref("");
const filterCategory = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(1);

// Modal konfirmasi hapus
const showDeleteModal = ref(false);
const contentToDelete = ref(null);
const isLoading = ref(true);
const isDeleting = ref(false);

// Computed property untuk konten yang difilter
const filteredContent = computed(() => {
  if (!contentStore.contents) return [];

  return contentStore.contents.filter((item) => {
    // Periksa apakah item dan propertinya ada sebelum menggunakan toLowerCase()
    const titleMatch =
      item.title &&
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const descMatch =
      item.description &&
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchQuery = titleMatch || descMatch;

    const matchCategory =
      filterCategory.value === "" || item.category === filterCategory.value;

    return matchQuery && matchCategory;
  });
});

// Computed property untuk konten yang difilter dan dipaginasi
const paginatedContent = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  // Update total pages
  totalPages.value =
    Math.ceil(filteredContent.value.length / itemsPerPage.value) || 1;

  // Ensure currentPage is valid
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }

  return filteredContent.value.slice(startIndex, endIndex);
});

// Computed property untuk total jumlah konten per kategori
const contentCounts = computed(() => {
  const counts = {
    layanan: 0,
    produk: 0,
    mitra: 0,
    total: contentStore.contents ? contentStore.contents.length : 0,
  };

  if (contentStore.contents) {
    contentStore.contents.forEach((item) => {
      if (item.category === "Layanan") counts.layanan++;
      if (item.category === "Produk") counts.produk++;
      if (item.category === "Mitra") counts.mitra++;
    });
  }

  return counts;
});

// Computed property untuk menghasilkan array nomor halaman yang akan ditampilkan
const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 3;

  if (totalPages.value <= maxVisiblePages) {
    // Jika total halaman kurang dari atau sama dengan maxVisiblePages, tampilkan semua halaman
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Tentukan halaman yang akan ditampilkan
    let startPage = Math.max(
      1,
      currentPage.value - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

    // Sesuaikan startPage jika endPage sudah mencapai batas maksimum
    if (endPage === totalPages.value) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// Fungsi untuk menghapus konten
const deleteContent = (id) => {
  contentToDelete.value = id;
  showDeleteModal.value = true;
};

// Fungsi untuk mengedit konten
const editContent = (id) => {
  router.push(`/content/update/${id}`);
};

// Konfirmasi hapus
const confirmDelete = async () => {
  try {
    isDeleting.value = true;
    await contentStore.deleteContent(contentToDelete.value);

    // Tutup modal setelah penghapusan berhasil
    showDeleteModal.value = false;
    contentToDelete.value = null;

    // Refresh data konten setelah penghapusan
    await contentStore.fetchContents();

    // Bisa tambahkan notifikasi sukses jika perlu
    console.log("Content berhasil dihapus");
  } catch (error) {
    console.error("Error deleting content:", error);
    // Tambahkan notifikasi error jika diperlukan
  } finally {
    isDeleting.value = false;
  }
};

// Batal hapus
const cancelDelete = () => {
  showDeleteModal.value = false;
  contentToDelete.value = null;
};

// Fungsi untuk navigasi pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Fungsi untuk halaman sebelumnya
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Fungsi untuk halaman berikutnya
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Lakukan pencarian dengan debounce
const performSearch = (value) => {
  console.log("Melakukan pencarian dengan query:", value);
  searchQuery.value = value;
  currentPage.value = 1; // Reset ke halaman pertama saat pencarian berubah
};

// Reset pagination ke halaman pertama ketika pencarian atau filter berubah
watch([searchQuery, filterCategory], () => {
  console.log(
    "Search atau filter berubah, reset halaman:",
    searchQuery.value,
    filterCategory.value
  );
  currentPage.value = 1;
});

// Fetch data konten saat komponen dimuat
onMounted(async () => {
  isLoading.value = true;
  try {
    await contentStore.fetchContents();
    console.log(
      "Berhasil memuat data konten:",
      contentStore.contents.length,
      "item"
    );
  } catch (error) {
    console.error("Error fetching contents: ", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <ContainerContentView>
    <div class="">
      <!-- Content Grid -->
      <div class="mt-0">
        <!-- Content Menu -->
        <div class="grid grid-cols-3 gap-4">
          <!-- Content 1 Menu CMS -->

          <div>
            <div
              class="bg-white rounded-lg shadow-sm hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Layanan Terbaik Kami</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">
                {{ contentCounts.layanan }}
              </p>
            </div>
          </div>

          <div>
            <div
              class="bg-white rounded-lg shadow-sm hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Produk Kami</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">
                {{ contentCounts.produk }}
              </p>
            </div>
          </div>

          <div>
            <div
              class="bg-white rounded-lg shadow-sm hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Mitra</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">
                {{ contentCounts.mitra }}
              </p>
            </div>
          </div>

          <!-- Jangan di isi biarkan kosong saja -->
          <div class="bg-transparent rounded-lg mb-2"></div>
        </div>

        <!-- Table Content -->
        <div class="">
          <!-- Search and Filter -->
          <div class="mb-6 flex gap-4">
            <div class="relative flex-grow bg-white shadow-sm rounded-lg">
              <input
                type="text"
                placeholder="Cari konten..."
                class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                v-model="searchQuery"
                @input="performSearch($event.target.value)"
              />
              <span class="absolute right-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <select
              class="px-4 py-2 border border-gray-300 bg-white rounded-lg focus:border-blue-900"
              v-model="filterCategory"
            >
              <option value="">Semua Kategori</option>
              <option value="Layanan">Layanan</option>
              <option value="Produk">Produk</option>
              <option value="Mitra">Mitra</option>
            </select>
          </div>

          <!-- Debug Info (Bisa dihapus di production) -->
          <div class="mb-4 p-2 bg-gray-100 rounded text-xs" v-if="false">
            <p>Search Query: "{{ searchQuery }}"</p>
            <p>Filter: "{{ filterCategory }}"</p>
            <p>
              Total Content:
              {{ contentStore.contents ? contentStore.contents.length : 0 }}
            </p>
            <p>Filtered Content: {{ filteredContent.length }}</p>
            <p>Current Page: {{ currentPage }} / {{ totalPages }}</p>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex justify-center my-8">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            ></div>
          </div>

          <!-- Table View -->
          <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
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
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in paginatedContent" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="h-16 w-24 object-cover rounded"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ item.title }}
                    </div>
                    <div class="text-sm text-gray-500">{{ item.category }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <p class="text-sm text-gray-500 line-clamp-2">
                      {{ item.description }}
                    </p>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <div class="flex space-x-2">
                      <button
                        @click="editContent(item.id)"
                        class="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        @click="deleteContent(item.id)"
                        class="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- No results message -->
                <tr v-if="paginatedContent.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-10 w-10 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p class="text-base font-medium">
                        {{
                          searchQuery
                            ? "Tidak ada konten yang sesuai dengan pencarian Anda"
                            : "Tidak ada konten yang tersedia"
                        }}
                      </p>
                      <p class="text-sm mt-1">
                        {{
                          searchQuery
                            ? "Coba gunakan kata kunci lain atau hapus filter"
                            : "Silakan tambahkan konten baru"
                        }}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            v-if="!isLoading && filteredContent.length > 0"
            class="flex justify-between items-center mt-6"
          >
            <div class="text-sm text-gray-700">
              Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} hingga
              {{ Math.min(currentPage * itemsPerPage, filteredContent.length) }}
              dari {{ filteredContent.length }} konten
            </div>
            <div class="flex space-x-2">
              <button
                @click="goToPreviousPage"
                class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === 1"
                :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }"
              >
                Sebelumnya
              </button>
              <button
                v-for="page in pageNumbers"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 border rounded-md',
                  currentPage === page
                    ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="goToNextPage"
                class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === totalPages"
                :class="{
                  'cursor-not-allowed opacity-50': currentPage === totalPages,
                }"
              >
                Berikutnya
              </button>
            </div>
          </div>

          <!-- Delete Confirmation Modal -->
          <div
            v-if="showDeleteModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div class="bg-white p-6 rounded-lg w-96 shadow-xl">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Konfirmasi Hapus
              </h3>
              <p class="text-gray-500 mb-6">
                Apakah Anda yakin ingin menghapus konten ini? Tindakan ini tidak
                dapat dibatalkan.
              </p>
              <div class="flex justify-end space-x-3">
                <button
                  @click="cancelDelete"
                  class="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                  :disabled="isDeleting"
                >
                  Batal
                </button>
                <button
                  @click="confirmDelete"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  :disabled="isDeleting"
                >
                  <span v-if="isDeleting" class="mr-2">
                    <svg
                      class="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  {{ isDeleting ? "Menghapus..." : "Hapus" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContainerContentView>
</template>

<style scoped></style>
