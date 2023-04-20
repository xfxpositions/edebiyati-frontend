import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import VWave from "v-wave";

let app = createApp(App);
//load gentiom book plus from google fonts
app.use(router);
app.use(VWave);
app.mount("#app");
