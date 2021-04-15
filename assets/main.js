import Vue from "vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import Switch from "buefy/dist/esm/switch";
import Radio from "buefy/dist/esm/radio";
import Field from "buefy/dist/esm/field";
import Modal from "buefy/dist/esm/modal";
import Autocomplete from "buefy/dist/esm/autocomplete";

import store from "./store";
import config from "./store/config";
import App from "./App.vue";
import { Container, Settings, Index, Show, ContainerNotFound, PageNotFound, Login } from "./pages";

Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Field);
Vue.use(Modal);
Vue.use(Autocomplete);

const caproverRelatedWhitelist = [
  /srv-captain--.+/g,
  /captain-certbot\.\d+\..+/g,
  /captain-nginx\.\d+\..+/g,
  /captain-captain\.\d+\..+/g,
  /captain-netdata-container/g,
];

Vue.filter("caprover", (value) => {
  const isEnabled = store.state.settings.caproverIntergration;
  const isCaprover = caproverRelatedWhitelist.some((re) => re.test(value));
  if (!isEnabled | !isCaprover) return value;

  // WTF?
  // Why this console.log fixes render???????

  console.log(caproverRelatedWhitelist.some((re) => re.test(value)));
  const parts = value.split(".");

  if (value.startsWith("srv-captain--")) {
    return `${parts[0].slice(13)}#${parts[1]} | CapRover`;
  } else {
    return `${parts[0].slice(8)} | CapRover (internal)`;
  }
});

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
    path: "/container/*",
    component: ContainerNotFound,
    name: "container-not-found",
  },
  {
    path: "/settings",
    component: Settings,
    name: "settings",
  },
  {
    path: "/show",
    component: Show,
    name: "show",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/*",
    component: PageNotFound,
    name: "page-not-found",
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
