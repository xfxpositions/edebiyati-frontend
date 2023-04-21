import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/ProfileView.vue";
import Logout from "../views/LogoutView.vue";
import PostsView from "../views/PostsView.vue";
import WriteView from "../views/WriteView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    name: "Posts",
    path: "/posts",
    component: PostsView,
  },
  {
    name: "SignIn",
    path: "/signin",
    component: SignIn,
  },
  {
    name: "Profile",
    path: "/profile",
    component: Profile,
  },
  {
    name: "SignUp",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "Logout",
    path: "/logout",
    component: Logout,
  },
  {
    name: "Write",
    path: "/write",
    component: WriteView,
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token == null && to.path == "/profile") {
    next({ path: "/signin" });
  } else {
    next();
  }
});

export default router;
