import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/DisciplineDashboard.vue";
import LoginView from "../views/LoginView.vue";
import RegistrarPresenca from "../views/RegistrarPresenca.vue";
import DisciplineManager from "../views/DisciplineManager.vue";
import NoAccess from "../views/NoAccess.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/registrar-presenca",
    },
    {
      path: "/dashboard/:offeringId",
      name: "Dashboard",
      component: Dashboard,
      props: true,
    },
    {
      path: "/noAccess",
      name: "NoAccess",
      component: NoAccess,
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
      path: "/disciplinas/:offeringId/gerenciar",
      name: "DisciplineReport",
      component: () => import("../views/DisciplineReport.vue"),
      props: true,
    },
  ],
});

export default router;
