<template>
  <div>
    <div>
      <!-- <router-link to="/">Data Analysis</router-link>
      <router-link to="/about">About</router-link> -->
      <SideBar />
    </div>
    <router-view />
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  name: "app",
  components: {
    // HelloWorld
    SideBar,
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
