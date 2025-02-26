import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
