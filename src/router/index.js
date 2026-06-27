import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Phase1BriefingView from "../views/Phase1BriefingView.vue";
import FieldworkView from "../views/Fieldwork/FieldworkView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/phase-1",
      name: "phase1",
      component: Phase1BriefingView,
    },
    {
      path: "/fieldwork",
      name: "fieldwork",
      component: FieldworkView,
    }
  ],
});

export default router;
