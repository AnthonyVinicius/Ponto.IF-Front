import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import LoginView from "../views/LoginView.vue";
import RegistrarPresenca from "../views/RegistrarPresenca.vue";
import ReportsView from "../views/DisciplineReport.vue";
import DisciplineManager from "../views/DisciplineManager.vue";

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
    {
      path: "/disciplineManager",
      name: "Disciplinas",
      component: DisciplineManager,
    },
    {
      path: "/dashboard/:userId/user",
      name: "userDashboard",
      component: () => import("../views/UserDashboard.vue"),
    },
    {
      path: "/dashboard/:disciplineId/report",
      name: "diciplineReport",
      component: () => import("../views/DisciplineReport.vue"),
    },
  ],
});

export default router;
