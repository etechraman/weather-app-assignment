<template>
  <div>
    <header class="w3-container w3-teal">
      <span class="w3-opennav w3-xlarge">
        <div
          class="menuContainer"
          v-click-outside="onClickOutside"
          @click="handleMenuClick()"
        >
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
      </span>
    </header>
    <nav
      ref="sidenav"
      class="w3-sidenav w3-white w3-card-2"
      style="display:none"
    >
      <a @click="dataAnalysis()">Data Analysis</a>
      <a @click="todaysWeather()">Today's Weather</a>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import vClickOutside from "v-click-outside";
import mdiVue from "mdi-vue";
import * as mdijs from "@mdi/js";

Vue.use(mdiVue, {
  icons: mdijs,
});
export default {
  name: "sidebar",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      showSideNav: false,
    };
  },
  methods: {
    onClickOutside() {
      if (this.$refs.sidenav.style.display === "block") this.closeMenu();
      else return;
    },
    handleMenuClick() {
      if (this.$refs.sidenav.style.display === "none") this.openMenu();
      else {
        this.closeMenu();
      }
    },
    openMenu() {
      document
        .getElementsByClassName("menuContainer")[0]
        .classList.toggle("change");
      this.$refs.sidenav.style.display = "block";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    },
    closeMenu() {
      document
        .getElementsByClassName("menuContainer")[0]
        .classList.toggle("change");
      this.$refs.sidenav.style.display = "none";
      document.body.style.backgroundColor = "white";
    },
    dataAnalysis() {
      this.$router.push("/").catch(() => {});
      this.closeMenu();
    },
    todaysWeather() {
      this.$router.push("/todaysweather").catch(() => {});
      this.closeMenu();
    },
  },
};
</script>

<style>
@import "../assets/stylesheets/stylesheet.css";

.menuContainer {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
</style>
