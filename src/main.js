import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import VWave from "v-wave";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import vue3GoogleLogin from "vue3-google-login";
import Notifications from "notiwind";
import { MotionPlugin } from "@vueuse/motion";
library.add(far);
library.add(fas);

let app = createApp(App);
//load gentiom book plus from google fonts
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VWave);
app.use(autoAnimatePlugin);
app.use(Notifications);
app.use(vue3GoogleLogin, {
  clientId:
    "996476342171-ngk6soejcvscvj1a7mgtgshpqj4boejv.apps.googleusercontent.com",
});
app.use(MotionPlugin).component("font-awesome-icon", FontAwesomeIcon);
app.use(MotionPlugin);
app.mount("#app");
