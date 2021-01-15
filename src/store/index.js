import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_API_KEY,
    weatherData: {
      data: {
        weather: [
          {
            main: "N/A",
            description: "N/A",
          },
        ],
        main: {
          temp_min: "",
          temp_max: "",
          humidity: "",
        },
      },
    },
    apiError: {},
  },
  getters: {
    apiKey: (state) => state.apiKey,
    weatherData: (state) => state.weatherData,
    apiError: (state) => state.apiError,
  },
  mutations: {
    clearWeatherData(state) {
      state.weatherData = {};
    },
    updateWeatherData(state, val) {
      state.weatherData = val;
    },
    updateApiError(state, val) {
      state.apiError = val;
    },
  },
  actions: {
    async search({ commit }, payload) {
      try {
        if (payload.city && !payload.country) {
          const resp = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${payload.city}&appid=${payload.apiKey}`
          );
          commit("updateWeatherData", resp);
          return true;
        } else if (payload.country && !payload.city) {
          const resp = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${payload.country}&appid=${payload.apiKey}`
          );
          commit("updateWeatherData", resp);
          return true;
        } else {
          const resp = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${payload.city},${payload.country}&appid=${payload.apiKey}`
          );
          commit("updateWeatherData", resp);
          return true;
        }
      } catch (err) {
        // console.log(err.response);
        commit("updateApiError", err.response);
        return false;
      }
    },
  },
  modules: {},
});
