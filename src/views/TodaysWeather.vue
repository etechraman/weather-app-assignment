<template>
  <div class="main">
    <div class="mainContainer">
      <div class="title">
        Today's Weather
        <hr />
      </div>
      <div class="content pt-3">
        <div class="top">
          City:
          <input type="text" v-model="city" v-on:keyup.enter="handleSearch()" />
          Country:
          <input
            v-model="country"
            type="text"
            v-on:keyup.enter="handleSearch()"
          />
          <button @click="handleSearch()">Search</button>
        </div>
        <div class="weatherDetails mt-5 pt-5">
          <div class="weatherDetailsChild ">
            <img
              v-if="isLoading"
              class="mr-4"
              src="../assets/spinner.gif"
              alt="clouds"
            />
            <img
              v-if="na"
              width="225px"
              height="225px"
              class="mr-4"
              src="../assets/na.png"
              alt="N/A"
            />
            <img
              v-if="
                weatherData.data.weather[0].main !== 'Clouds' &&
                  weatherData.data.weather[0].main !== 'Clear' &&
                  weatherData.data.weather[0].main !== 'Rain' &&
                  !isLoading &&
                  !na
              "
              width="225px"
              height="225px"
              class="mr-4"
              src="../assets/na.png"
              alt="N/A"
            />
            <img
              v-if="weatherData.data.weather[0].main === 'Clouds'"
              width="225px"
              height="225px"
              class="mr-4"
              src="../assets/clouds.png"
              alt="clouds"
            />
            <img
              v-if="weatherData.data.weather[0].main === 'Clear'"
              width="225px"
              height="225px"
              class="mr-4"
              src="../assets/clear.png"
              alt="clear"
            />
            <img
              v-if="weatherData.data.weather[0].main === 'Rain'"
              width="225px"
              height="225px"
              class="mr-4"
              src="../assets/rain.png"
              alt="rain"
            />
            <div class="px-5">
              <h2 class="ml-5">
                {{ weatherData.data.weather[0].main }}
              </h2>
              <h3 class="ml-5 mt-3 text-secondary">
                {{ weatherData.data.weather[0].description }}
              </h3>
            </div>
          </div>
        </div>
        <div class="weatherDepthDetails mt-5 pt-5">
          <div class="d-flex flex-column">
            <h3>
              Temperature: {{ weatherData.data.main.temp_min - 273.15 }}&#8451;
              ~ {{ weatherData.data.main.temp_max - 273.15 }}&#8451;
            </h3>
            <h3 class="mt-5">
              Humidity: {{ weatherData.data.main.humidity }}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TodaysWeather",
  data() {
    return {
      city: "",
      isLoading: false,
      na: true,
      country: "",
      mountWeatherData: {
        data: {
          weather: [
            {
              main: "N/a",
              description: "N/a",
            },
          ],
          main: {
            temp_min: "",
            temp_max: "",
            humidity: "",
          },
        },
      },
    };
  },
  mounted() {
    this.$store.commit("updateWeatherData", this.mountWeatherData);
  },
  computed: {
    ...mapGetters(["apiKey", "weatherData", "apiError"]),
  },
  methods: {
    async handleSearch() {
      if (this.city) {
        this.na = false;
        this.isLoading = true;
        const resp = await this.$store.dispatch("search", {
          city: this.city,
          apiKey: this.apiKey,
        });
        if (resp) {
          this.isLoading = false;
          this.na = false;
          this.city = "";
        } else {
          this.city = "";
          this.na = true;
          alert(this.apiError.data.message);
          this.isLoading = false;
        }
      } else if (this.country) {
        this.na = false;
        this.isLoading = true;
        const resp = await this.$store.dispatch("search", {
          country: this.country,
          apiKey: this.apiKey,
        });
        if (resp) {
          this.isLoading = false;
          this.na = false;
          this.country = "";
        } else {
          this.country = "";
          this.na = true;
          alert(this.apiError.data.message);
          this.isLoading = false;
        }
      } else if (this.city && this.country) {
        this.na = false;
        this.isLoading = true;
        const resp = await this.$store.dispatch("search", {
          city: this.city,
          country: this.country,
          apiKey: this.apiKey,
        });
        if (resp) {
          this.isLoading = false;
          this.na = false;
          this.city = "";
          this.country = "";
        } else {
          this.na = true;
          this.isLoading = false;
          this.city = "";
          this.country = "";
          alert(this.apiError.data.message);
        }
      } else alert("Enter atleast one field city or country");
    },
  },
};
</script>
<style>
.top {
  width: 100%;
}
.top input {
  margin-left: 1%;
  margin-right: 5.5%;
}
.weatherDetails {
  padding-top: 50px;
}
.weatherDetailsChild {
  display: flex;
}
@media screen and (max-width: 900px) {
  .top {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .top input {
    margin-top: 12px;
    margin-bottom: 12px;
    width: 70%;
  }
  .top button {
    width: 66px;
  }
}
@media screen and (max-width: 768px) {
  .content {
    width: 95%;
    height: auto;
  }
  .top {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .top button {
    margin-top: 20px;
  }
  .weatherDepthDetails h3 {
    font-size: 1.13rem;
  }
  .weatherDetailsChild {
    display: block;
  }
}
</style>
