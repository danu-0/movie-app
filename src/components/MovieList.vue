<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import HeroSection from "./HeroSection.vue";
import { getPopularMovies, searchMovies } from "../services/movies";

const query = ref("");
const heroMovie = ref(null);
const movies = ref([]);
const loading = ref(false);
const error = ref(null);
let heroInterval = null

const loadMovies = async () => {
  try {
    loading.value = true;
    const data = await getPopularMovies();
    movies.value = data.results;
    heroMovie.value =
      data.results[Math.floor(Math.random() * data.results.length)];
       startHeroRotation();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const startHeroRotation = () => {
  if (heroInterval) clearInterval(heroInterval);

  heroInterval = setInterval(() => {
    if (movies.value.length > 0) {
      const random = Math.floor(Math.random() * movies.value.length);
      heroMovie.value = movies.value[random];
    }
  }, 5000)
}

const search = async () => {
  if (!query.value) return loadMovies();
  try {
    loading.value = true;
    const data = await searchMovies(query.value);
    movies.value = data.results;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};


onBeforeMount(() => {
  if (heroInterval) clearInterval(heroInterval);
});

onMounted(loadMovies);

const filteredMovies = computed(() => movies.value);
</script>

<template>
  <div class="movie-list">
    <!-- Hero section -->
    <HeroSection v-if="heroMovie" :movie="heroMovie" />

    <!-- Search bar -->
    <div class="search-container">
      <input
        v-model="query"
        @keyup.enter="search"
        placeholder="Find Movie..."
        class="search"
      />
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
    </div>

    <p class="loading" v-if="loading">Loading...</p>
    <p class="loading" v-if="error">{{ error }}</p>

    <!-- List movie -->
    <div class="movies" v-if="!loading && !error">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-card"
        :style="{
          backgroundImage: movie.poster_path ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`: 'url(/placeholder.jpg)',
        }"
      >
        <div class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</div>
        <div class="years">{{ movie.release_date?.slice(0,4) }}</div>
        <div class="info">
          <h3>{{ movie.title }}</h3>
        </div>
        <div class="overlay">
          <p>{{ movie.overview || "No Overview available" }}</p>
          <router-link :to="`/movie/${movie.id}`">
            <button>Watch</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 90%;
  max-width: 850px;
  margin: 2rem auto 1rem;
  display: flex;
  justify-content: center;
}

.search {
  width: 100%;
  padding: 1rem 3.2rem 1rem 3rem;
  font-size: 1.1rem;
  border-radius: 9999px;
  border: none;
  outline: none;
  background: rgba(30, 41, 59, 0.7);
  color: #f8fafc;
  backdrop-filter: blur(8px);
  box-shadow: 0 0 0 2px transparent;
  transition: all 0.3s ease;
}

.search::placeholder {
  color: #94a3b8;
  letter-spacing: 0.5px;
}

.search:focus {
  box-shadow: 0 0 5px 1px #cf4bff;
  background: rgba(30, 41, 59, 0.85);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  color: #94a3b8;
  pointer-events: none;
  transition: color 0.3s ease;
}

.search:focus + .search-icon,
.search-container:hover .search-icon {
  color: #94a3b8;
}
.loading {
  color: #cf4bff;
  text-align: center;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

.movie-card {
  position: relative;
  height: 330px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

/* rating pojok kanan atas */
.rating {
  position: absolute;
  top: 8px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fbbf24;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
.years {
  position: absolute;
  top: 8px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #f8fafc;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

/* judul di bawah tengah */
.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 3), rgba(0, 0, 0, 0));
  text-align: center;
  padding: 1rem 0.5rem 0.8rem;
}

.info h3 {
  color: #f8fafc;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

/* overlay muncul saat hover */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #e2e8f0;
  font-size: 0.9rem;
  padding: 1rem;
  text-align: center;
  line-height: 1.4;
  transition: opacity 0.3s ease;
}

.overlay p {
  max-width: 100%; 
  line-clamp: 5;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overlay button {
  background-color: #cf4bff;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  cursor: pointer;
}

.movie-card:hover .overlay {
  opacity: 1;
}
/* Tablet */
@media (max-width: 1024px) {
  .movies {
    grid-template-columns: repeat(auto-fill, 180px);
    gap: 1rem;
    padding: 1.5rem;
  }
}
/* Mobile */
@media (max-width: 640px) {
  .search {
    font-size: 1rem;
    padding: 0.8rem 2.5rem 0.8rem 2.5rem;
    border-radius: 50px;
  }

  .search-container {
    width: 90%;
    margin: 1.5rem auto;
  }

  .search-icon {
    width: 18px;
    height: 18px;
    left: 0.9rem;
  }
  .movies {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
  }

  .movie-card {
    border-radius: 10px;
  }

  .movie-card h3 {
    font-size: 0.9rem;
  }

  .movie-card .movie-overlay {
    font-size: 0.8rem;
  }
}
</style>
