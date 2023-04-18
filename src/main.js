import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
let app = createApp(App);
//load gentiom book plus from google fonts
app.use(router);
app.mount("#app");
