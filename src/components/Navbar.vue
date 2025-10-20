<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <nav class="navbar">
    <div class="logo">
    <span>MOVIE APP</span>
    </div>
    <ul class="nav-links">
      <!-- <li><a to="/"">Movie</a></li> -->
       <RouterLink to="/">Movies</RouterLink>
      <li><a href="#">Series</a></li>
    </ul>
  </nav>
</template>


<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 2px solid #334155;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-weight: 700;
  font-size: 1.4rem;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.logo span {
  color: #cf4bff;  
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #cbd5e1;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #cf4bff;
}
</style>
