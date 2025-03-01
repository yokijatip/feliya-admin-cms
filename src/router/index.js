import { compile } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/dashboard/Dashboard.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/forms",
    name: "Forms",
    component: () => import("../views/Forms.vue"),
  },
  {
    path: "/layanan-kami",
    name: "LayananKami",
    component: () => import("../views/dashboard/Layanan.vue"),
  },
  {
    path: "/mitra-kami",
    name: "MitraKami",
    component: () => import("../views/dashboard/Mitra.vue"),
  },
  {
    path: "/produk-kami",
    name: "ProdukKami",
    component: () => import("../views/dashboard/Produk.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
