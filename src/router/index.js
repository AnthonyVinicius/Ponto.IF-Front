import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import LoginView from "../views/LoginView.vue"
import RegistrarPresenca from "../views/RegistrarPresenca.vue"
import DisciplineManager from "../views/DisciplineManager.vue"
import AllStudants from "../views/AllStudants.vue"

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
      name: "Login",
      component: LoginView,
    },
    {
      path: "/registrar-presenca",
      name: "RegistrarPresenca",
      component: RegistrarPresenca,
    },
    {
      path: "/allStudants",
      name: "AllStudants",
      component: AllStudants,
    },
    {
      path: "/disciplinas",
      name: "DisciplineManager",
      component: DisciplineManager,
    },
    {
      path: "/dashboard/:userId/user",
      name: "UserDashboard",
      component: () => import("../views/UserDashboard.vue"),
    },
    {
      path: "/disciplinas/:disciplineId/gerenciar",
      name: "DisciplineReport",
      component: () => import("../views/DisciplineReport.vue"),
    },
  ],
})

export default router
