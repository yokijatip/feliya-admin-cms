<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-2xl font-semibold font-display text-gray-800">
      <slot></slot>
    </h1>

    <!-- Button Add Product dengan icon plus menggunakan Heroicons -->
    <!-- Button Add Content -->
    <button
      class="flex items-center space-x-2 bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      <PlusIcon class="w-5 h-5" />
      <!-- Ikon Plus dari Heroicons -->
      <span>Add Content</span>
    </button>
  </div>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid"; // Impor ikon solid
</script>

<style></style>
