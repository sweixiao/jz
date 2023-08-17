import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store";
import uviewPlus from "uview-plus";
import tabBar from "@/components/tabbar";

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(uviewPlus);
  app.component("tabbar", tabBar);
  return {
    app,
  };
}
