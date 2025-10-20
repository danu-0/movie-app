<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieDetail } from "../services/movies";
import MoviePlayer from "../components/MoviePlayer.vue";

const route = useRoute();
const router = useRouter();
const movie = ref(null);
const loading = ref(false);
const error = ref(null);

const loadDetail = async () => {
  try {
    loading.value = true;
    const data = await getMovieDetail(route.params.id);
    movie.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(loadDetail);
</script>

<template>
  <div class="movie-detail">
    <!-- <button class="back-btn" @click="router.back()">← Back</button> -->

    <p v-if="loading" class="loading-text">Loading movie details...</p>
    <p v-if="error" class="error-text">{{ error }}</p>

    <div v-if="movie" class="detail-container">
      <div class="poster-wrapper">
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'"
          :alt="movie.title"
          class="poster"
        />
      </div>

      <div class="info">
        <h1 class="title">{{ movie.title }}</h1>
        <p class="meta">
          {{ movie.release_date?.slice(0, 4) }} • ⭐
          {{ movie.vote_average?.toFixed(1) }}
        </p>
        <p class="overview">
          {{ movie.overview || "No overview available." }}
        </p>

        <div class="genres">
          <h2>Genres</h2>
          <div class="genre-list">
            <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
              {{ genre.name }}
            </span>
          </div>
        </div>
    </div>
</div>
<MoviePlayer v-if="movie" :movie-id="movie.id"/>
  </div>
</template>

<style scoped>
.movie-detail {
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  padding: 2rem 1rem;
  box-sizing: border-box;
}

/* .back-btn {
  background: none;
  border: none;
  color: #a855f7;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-align: left;
  display: block;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #d8b4fe;
} */

.loading-text,
.error-text {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
}

.error-text {
  color: #f87171;
}

.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.poster-wrapper {
  width: 100%;
  max-width: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.poster {
  width: 100%;
  display: block;
}

.info {
  text-align: left;
  max-width: 700px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.meta {
  color: #94a3b8;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.overview {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #e2e8f0;
}

.genres h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.genre-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.genre-tag {
  background-color: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.genre-tag:hover {
  background-color: rgba(168, 85, 247, 0.3);
}

/* Responsive */
@media (min-width: 768px) {
  .detail-container {
    flex-direction: row;
    align-items: flex-start;
  }

  .poster-wrapper {
    flex: 1;
  }

  .info {
    flex: 2;
    padding-left: 2rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .overview {
    font-size: 1.05rem;
  }
}
</style>
