import { createRouter, createWebHistory } from "vue-router";
import MovieList from "../components/MovieList.vue";
import MovieDetail from "../pages/MovieDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: MovieList },
    { path: "/movie/:id", name: "movie-detail", component: MovieDetail },
  ],

  // ✨ Tambahkan ini
  scrollBehavior(to, from, savedPosition) {
    // jika ada posisi tersimpan (misalnya user klik tombol back)
    if (savedPosition) {
      return savedPosition;
    }

    // jika menuju ke halaman detail movie
    if (to.name === "movie-detail") {
      return { top: 0 };
    }

    // default: tidak ubah posisi
    return {};
  },
});

export default router;
