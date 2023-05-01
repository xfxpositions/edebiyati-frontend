import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Profile from "../views/ProfileView.vue";
import Logout from "../views/LogoutView.vue";
import PostsView from "../views/PostsView.vue";
import WriteView from "../views/WriteView.vue";
import PostsViewTest from "../views/PostsViewTest.vue";
import ProfileHome from "../views/ProfileViews/ProfileHome.vue";
import ProfileAbout from "../views/ProfileViews/ProfileAbout.vue";
import SettingsView from "../views/SettingsView.vue";
import ProfileSettings from "../views/SettingsViews/ProfileSettings.vue";
import SinglePost from "../views/SinglePost.vue";
import google from "../views/GoogleView.vue";
import favoritesView from "../views/FavoritesView.vue";
//import WriteTest from "../views/WriteTest.vue";
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
    name: "SinglePost",
    path: "/:title",
    component: SinglePost,
    props: (route) => ({ id: route.query.id }),
  },
  {
    name: "SignIn",
    path: "/signin",
    component: SignIn,
  },
  {
    name: "Profile",
    path: "/user/:name",
    props: (route) => ({ id: route.query.id }),
    component: Profile,
    redirect: "/user/:name/home",
    children: [
      {
        name: "ProfileHome",
        path: "home",
        component: ProfileHome,
      },
      {
        name: "ProfileAbout",
        path: "about",
        component: ProfileAbout,
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    component: SettingsView,
    redirect: "/settings/account",
    children: [
      {
        name: "Account",
        path: "account",
        component: ProfileSettings,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
    redirect: "/settings/account",
    children: [
      {
        name: "Account",
        path: "account",
        component: ProfileSettings,
      },
    ],
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
  {
    name: "PostsTest",
    path: "/poststest",
    component: PostsViewTest,
  },
  {
    name: "Google",
    path: "/google",
    component: google,
  },
  {
    name: "Favoriters",
    path: "/favorites",
    component: favoritesView,
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
