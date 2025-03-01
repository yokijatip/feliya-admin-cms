<script setup>
import ContainerContentView from "../../components/ContainerContentView.vue";
import TopBar from "../../components/TopBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToLayananKami = () => {
  router.push("/layanan-kami");
};

const navigateToProdukKami = () => {
  router.push("/produk-kami");
};

const navigateToMitra = () => {
  router.push("/mitra-kami");
};
</script>

<template>
  <ContainerContentView>
    <div class="">
      <TopBar>Dashboard</TopBar>

      <!-- Content Grid -->
      <div class="mt-8">
        <div class="grid grid-cols-3 gap-4">
          <!-- Content 1 Menu CMS -->

          <router-link
            to="/dashboard/layanan-kami"
            @click="navigateToLayananKami"
          >
            <div
              class="bg-white rounded-lg shadow-md hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Layanan Terbaik Kami</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">1</p>
            </div>
          </router-link>

          <router-link
            to="/dashboard/produk-kami"
            @click="navigateToProdukKami"
          >
            <div
              class="bg-white rounded-lg shadow-md hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Produk Kami</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">4</p>
            </div>
          </router-link>

          <router-link to="/dashboard/mitra-kami" @click="navigateToMitra">
            <div
              class="bg-white rounded-lg shadow-md hover:bg-gray-100 active:bg-gray-200"
            >
              <h3 class="text-sm font-semibold p-4">Mitra</h3>
              <p class="text-2xl font-bold p-4 text-gray-800">48</p>
            </div>
          </router-link>

          <!-- Jangan di isi biarkan kosong saja -->
          <div class="bg-transparent rounded-lg p-4"></div>
        </div>
      </div>
    </div>
  </ContainerContentView>
</template>

<style scoped></style>
