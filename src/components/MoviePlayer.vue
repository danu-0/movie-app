<script setup>
import { ref, onMounted, watch } from "vue";
import { getMovieVideos } from "../services/movies";

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

const trailerKey = ref(null);
const loading = ref(false);
const error = ref(null);

const loadTrailer = async () => {
  try {
    loading.value = true;
    error.value = null;
    const data = await getMovieVideos(props.movieId);

    // ambil video YouTube dengan type "Trailer"
    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    trailerKey.value = trailer ? trailer.key : null;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(loadTrailer);
watch(() => props.movieId, loadTrailer);
</script>

<template>
  <div class="player-box">
    <p v-if="loading" class="loading">Loading trailer...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="trailerKey" class="video-wrapper">
      <iframe
        :src="`https://www.youtube.com/embed/${trailerKey}`"
        title="Trailer"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>

    <p v-else-if="!loading && !error" class="no-trailer">
      Trailer tidak tersedia.
    </p>
  </div>
</template>

<style scoped>
.player-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 2rem;
  text-align: center;
  color: #f8fafc;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 10px;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loading {
  color: #a5b4fc;
}

.error {
  color: #f87171;
}

.no-trailer {
  color: #94a3b8;
}
</style>
