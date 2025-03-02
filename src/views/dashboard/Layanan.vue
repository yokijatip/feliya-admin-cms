<script setup>
import ContainerContentView from "../../components/ContainerContentView.vue";
import TopBarContent from "../../components/TopBarContent.vue";
</script>

<template>
  <ContainerContentView>
    <TopBarContent addRoute="/forms">Konten Layanan</TopBarContent>

    <!-- Table Content -->
    <div class="mt-6">
      <!-- Search and Filter -->
      <div class="mb-6 flex gap-4">
        <div class="relative flex-grow bg-white shadow-sm rounded-lg">
          <input
            type="text"
            placeholder="Cari konten..."
            class="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            v-model="searchQuery"
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

      <!-- Table View -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
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
            <tr v-for="(item, index) in filteredContent" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ index + 1 }}
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
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-end items-center mt-6">
        <div class="flex space-x-2">
          <button
            class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            Sebelumnya
          </button>
          <button
            class="px-3 py-1 border border-blue-500 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            1
          </button>
          <button
            class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            2
          </button>
          <button
            class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            3
          </button>
          <button
            class="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            Berikutnya
          </button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
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
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </ContainerContentView>
</template>

<style></style>
