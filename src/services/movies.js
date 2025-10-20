const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL ='https://api.themoviedb.org/3'

export async function searchMovies(query) {
  const res = await fetch(`${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Gagal fetch data");
  return res.json();
}

export async function getPopularMovies() {
  const res = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error("Gagal fetch popular movies");
  return res.json();
}

export async function getMovieDetail(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
  if (!res.ok) throw new Error("Gagal fetch movie detail")
  return await res.json()
}

export const getMovieVideos = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch movie videos");
  return await res.json();
};
