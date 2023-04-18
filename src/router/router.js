import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      window.scrollTo({ top: 0, left: 0 });
      setTimeout(() => {
        window.scrollTo({ top: savedPosition.top, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  },
});

export default router;
