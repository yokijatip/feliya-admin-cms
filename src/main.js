import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// Middleware untuk proteksi Route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.authToken && to.name !== "Login") {
    // Redirect ke halaman login jika tidak ada token
    next({ name: "Login" });
    console.log("Auth token in middleware:", authStore.authToken);
  } else if (authStore.authToken && to.name === "Login") {
    // Redirect ke dashboard jika sudah login dan mencoba akses halaman login
    next({ name: "Dashboard" });
    console.log("Auth token in middleware:", authStore.authToken);
  } else {
    next();
  }
});

app.mount("#app");
