import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/DashboardVue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
  ],
});

export default router;
