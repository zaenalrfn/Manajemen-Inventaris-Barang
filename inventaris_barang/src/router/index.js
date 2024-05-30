import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/DashboardVue.vue";
import LihatDataBarang from "@/views/LihatDataBarang.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
    },
    {
      path: "/dataBarang",
      name: "barang",
      component: LihatDataBarang,
    },
  ],
});

export default router;
