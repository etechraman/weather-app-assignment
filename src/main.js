import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  BootstrapVue,
  IconsPlugin,
  VueApexCharts,
  
  render: (h) => h(App),
}).$mount("#app");
