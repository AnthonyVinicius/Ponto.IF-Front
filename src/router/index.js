import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import LoginView from "../views/LoginView.vue";
import RegistrarPresenca from "../views/RegistrarPresenca.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/registrar-presenca",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/registrar-presenca",
      name: "RegistrarPresenca",
      component: RegistrarPresenca,
    },
  ],
});

export default router;
