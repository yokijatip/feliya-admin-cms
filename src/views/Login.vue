<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const credentials = ref({ email: "", password: "" });
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  await authStore.login(credentials.value);
  console.log("Auth Token after login:", authStore.authToken); // Debugging token
  if (authStore.authToken) {
    console.log("Redirecting to dashboard...");
    router.push("/");
  }
};
</script>

<template>
  <section class="flex h-screen items-center justify-center bg-gray-100">
    <div class="flex w-2/3 bg-white shadow-2xl rounded-2xl">
      <div class="w-full bg-background p-10 flex flex-col">
        <h1 class="text-3xl font-bold mb-4">Feliya Laju Teknik CMS</h1>
        <p class="text-muted-foreground mb-6">
          Silahkan login dengan akun yang sudah dibuat
        </p>
        <form @submit.prevent="handleLogin">
          <label class="block mb-2 text-muted-foreground" for="email"
            >Email</label
          >
          <input
            class="w-full p-2 border border-border rounded mb-4"
            type="email"
            id="email"
            v-model="credentials.email"
            placeholder="Enter your email"
            required
          />
          <label class="block mb-2 text-muted-foreground" for="password"
            >Password</label
          >
          <input
            class="w-full p-2 border border-border rounded mb-4"
            type="password"
            id="password"
            placeholder="********"
            v-model="credentials.password"
            required
          />

          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-16"
            :class="{ 'opacity-50 cursor-not-allowed': authStore.isLoading }"
          >
            <svg
              v-if="authStore.isLoading"
              class="animate-spin h-5 w-5 mr-3 text-white"
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
            <span v-else>Sign In</span>
          </button>
          <p v-if="authStore.errorMessage" class="text-red-500 text-sm">
            {{ authStore.errorMessage }}
          </p>
        </form>
      </div>

      <div class="w-full">
        <div
          class="flex items-end h-full bg-[url('/src/assets/pattern_login.png')] bg-opacity-50 p-10 rounded-2xl rounded-bl-none rounded-tl-none"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
