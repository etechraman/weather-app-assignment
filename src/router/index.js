import Vue from "vue";
import VueRouter from "vue-router";
import DataAnalysis from "../views/DataAnalysis.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "DataAnalysis",
    component: DataAnalysis,
  },
  {
    path: "/todaysweather",
    name: "TodaysWeather",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "todaysweather" */ "../views/TodaysWeather.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
