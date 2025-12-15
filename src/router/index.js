import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/DisciplineDashboard.vue";
import LoginView from "../views/LoginView.vue";
import RegistrarPresenca from "../views/RegistrarPresenca.vue";
import DisciplineManager from "../views/DisciplineManager.vue";
import NoAccess from "../views/NoAccess.vue";
import ClassSessionHistoryManager from "../views/ClassSessionHistoryManager.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },

    {
      path: "/noAccess",
      name: "NoAccess",
      component: NoAccess,
    },

    {
      path: "/disciplinas",
      name: "DisciplineManager",
      component: DisciplineManager,
    },

    {
      path: "/dashboard/:offeringId",
      name: "Dashboard",
      component: Dashboard,
      props: true,
    },

    {
      path: "/registrar-presenca",
      name: "RegistrarPresenca",
      component: RegistrarPresenca,
    },

    {
      path: "/classSessionHistoryManager",
      name: "ClassSessionHistoryManager",
      component: ClassSessionHistoryManager,
    },

    {
      path: "/classSessionHistoryDashboard/:offeringId",
      name: "DashboardDisciplina",
      component: () =>
        import("../views/ClassSessionHistoryDashboard.vue"),
    },

    {
      path: "/dashboard/:offeringId/session/:sessionId",
      name: "SessionHistory",
      component: () =>
        import("../views/ClassSessionHistoryDetails.vue"),
    },

    {
      path: "/dashboard/:userId/user",
      name: "StudentDashboard",
      component: () =>
        import("../views/StudentDashboard.vue"),
    },

    {
      path: "/disciplinas/:offeringId/gerenciar",
      name: "DisciplineReport",
      component: () =>
        import("../views/DisciplineReport.vue"),
      props: true,
    },

    {
      path: "/alunos",
      name: "StudentManager",
      component: () =>
        import("../views/StudentManagerView.vue"),
    },
  ],
});

export default router;
