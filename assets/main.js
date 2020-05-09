import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Dropdown from "buefy/dist/esm/dropdown";
import Switch from "buefy/dist/esm/switch";
import store from "./store";
import config from "./store/config";
import App from "./App.vue";
import Container from "./pages/Container.vue";
import Settings from "./pages/Settings.vue";
import Index from "./pages/Index.vue";

Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(Dropdown);
Vue.use(Switch);

const routes = [
  {
    path: "/",
    component: Index,
    name: "default",
  },
  {
    path: "/container/:id",
    component: Container,
    name: "container",
    props: true,
  },
  {
    path: "/settings",
    component: Settings,
    name: "settings",
  },
];

const router = new VueRouter({
  mode: "history",
  base: config.base + "/",
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
