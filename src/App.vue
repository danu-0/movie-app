<script setup>
// import MovieList from "./components/MovieList.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div id="app">
    <Navbar/>
    <!-- <MovieList/> -->
     <router-view/>
  </div>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #0f172a;
  color: #f8fafc;
  text-align: center;
}
</style>
