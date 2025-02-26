<template>
  <section>
    <div
      class="bg-white text-black h-screen w-64 flex flex-col justify-between font-display p-8"
    >
      <!-- Logo dan Nama -->
      <div class="mb-8">
        <img class="w-full h-20" src="/src/assets/feliya-transparent.svg" />
      </div>

      <!-- Menu Navigasi -->
      <nav class="flex-grow">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="flex items-center px-6 py-3 rounded-md hover:bg-gray-600 hover:text-white text-gray-500"
              :class="{
                'bg-gray-400 text-white': $route.name === 'Dashboard',
              }"
            >
              <HomeIcon class="w-5 h-5 mr-2" />
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/forms"
              class="flex items-center px-6 py-3 rounded-md hover:bg-gray-600 hover:text-white text-gray-500"
              :class="{ 'bg-gray-400 text-white': $route.name === 'Forms' }"
            >
              <DocumentTextIcon class="h-5 w-5 mr-2" />
              <span>Forms</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Tombol Logout -->
      <div class="">
        <button
          @click="logout"
          class="w-full text-gray-500 hover:bg-gray-600 hover:text-white py-2 rounded-md"
        >
          <ArrowLeftOnRectangleIcon class="h-5 w-5 inline-block mr-2 mb-1" />
          <!-- Ikon untuk Logout -->
          Logout
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from "../store/authStore";
import router from "../router";
import { HomeIcon } from "@heroicons/vue/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/solid";
import { DocumentTextIcon } from "@heroicons/vue/24/solid";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style></style>
