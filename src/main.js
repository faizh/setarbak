import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import axios from 'axios';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import '../src/assets/main.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Toast)

Vue.prototype.$http = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
