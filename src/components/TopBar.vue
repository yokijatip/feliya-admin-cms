<template>
  <div class="w-full flex items-center justify-between">
    <h1 class="text-2xl font-semibold font-display text-gray-800">
      <slot></slot>
    </h1>

    <!-- Search field -->
    <div class="relative w-fit">
      <!-- Input Field -->
      <input
        type="text"
        placeholder="Search Here..."
        class="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300 shadow-sm"
      />

      <!-- Icon Inside the Input -->
      <MagnifyingGlassIcon
        class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
</script>

<style></style>
