import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import TelaLogin from "../components/TelaLogin.vue";
import LeitorBiometrico from "../views/LeitorBiometrico.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/login",
      name: "login",
      component: TelaLogin,
    },
    {
      path: "/registrar-presenca",
      name: "RegistrarPresenca",
      component: LeitorBiometrico,
    },
  ],
});

export default router;
