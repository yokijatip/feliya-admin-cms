<script setup>
import SideBar from "./components/SideBar.vue";
import router from "./router";
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <SideBar v-if="$route.name !== 'Login'" />

    <!-- Main Content -->

    <div
      class="flex-grow bg-gray-100 min-h-screen w-full"
      :class="{ 'ml-56': $route.name !== 'Login' }"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
