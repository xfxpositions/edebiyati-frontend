import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import VWave from "v-wave";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

let app = createApp(App);
//load gentiom book plus from google fonts
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VWave);
app.mount("#app");
