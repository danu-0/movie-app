//COMING SOON

// // src/services/tmdbProvider.js
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // ambil dari .env
// const API_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN; // opsional, jika pakai bearer token
// const BASE_URL = 'https://api.themoviedb.org/3';

// // opsi 1 — pakai api_key
// export const tmdbFetch = async (endpoint, params = {}) => {
//   const url = new URL(`${BASE_URL}${endpoint}`);
//   url.searchParams.append('api_key', API_KEY);
//   url.searchParams.append('language', 'en-US');

//   // tambahkan parameter tambahan jika ada
//   Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
//   return await res.json();
// };

// // opsi 2 — jika kamu ingin pakai token (lebih aman)
// export const tmdbFetchWithToken = async (endpoint, params = {}) => {
//   const url = new URL(`${BASE_URL}${endpoint}`);
//   url.searchParams.append('language', 'en-US');

//   Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${API_TOKEN}`,
//       Accept: 'application/json',
//     },
//   });

//   if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
//   return await res.json();
// };
