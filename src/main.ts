import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store";
import MainPage from "./components/MainPage.vue";
import AppPage from "./components/AppPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainPage, name: "Home" },
    { path: "/app", component: AppPage, name: "App" },
  ],
});

createApp(App).use(router).use(store).mount("#app");
