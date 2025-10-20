<template>
  <section v-if="movie" class="hero" :style="heroStyle">
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const heroStyle = computed(() => {
  const path =
    props.movie?.backdrop_path ||
    props.movie?.poster_path ||
    ""; // fallback kalau tidak ada
  return {
    backgroundImage: path
      ? `url(https://image.tmdb.org/t/p/original${path})`
      : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
});
</script>

<style scoped>
.hero {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  color: white;
  padding: 3rem;
  border-bottom: 4px solid #1e293b;
  transition: background-image 300ms ease-in-out;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.3));
}

.content {
  position: relative;
  max-width: 600px;
  z-index: 2;
  text-align: start;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

p {
  font-size: 1rem;
  color: #e2e8f0;
  line-height: 1.4;
  max-height: 6.3rem; /* batasi tinggi overview */
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 768px) {
  .hero {
    height: 40vh;
    padding: 1.5rem;
    align-items: flex-end;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.9rem;
    max-height: 4rem;
  }
}

</style>
