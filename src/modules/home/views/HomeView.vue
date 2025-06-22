<template>
  <!-- Fondo degradado claro/oscuro -->
  <div class="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">

    <!-- Carrusel Principal -->
    <div class="animate-fadeSlideIn mb-12">
      <Carousel />
    </div>

    <!-- Sección Animes -->
    <section class="py-16 px-6 sm:px-10 max-w-7xl mx-auto space-y-16 animate-fadeSlideIn delay-100">
      <!-- Título principal Animes -->
      <div class="relative border-b border-gray-300 dark:border-gray-700 pb-6">
        <h2 class="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
          🌸 Animes
        </h2>
        <p class="text-xl text-gray-700 dark:text-gray-300 mt-2">Disfruta los animes de temporada</p>
      </div>

      <!-- Carrusel de temporada -->
      <SubCarousel :items="animeStore.itemsSeason" class="enhanced-carousel" />

      <!-- Subtítulo Recomendados -->
      <div class="relative border-b border-gray-300 dark:border-gray-700 pb-6">
        <h3 class="text-2xl font-semibold text-purple-600 dark:text-purple-400">
          ⭐ Recomendados para ti
        </h3>
      </div>

      <SubCarousel :items="animeStore.itemsRecommend" class="enhanced-carousel" />
    </section>

    <!-- Separador visual -->
    <div class="my-16 flex items-center justify-center">
      <div class="w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
    </div>

    <!-- Sección Mangas -->
    <section class="py-16 px-6 sm:px-10 max-w-7xl mx-auto space-y-16 animate-fadeSlideIn delay-200">
      <div class="relative border-b border-gray-300 dark:border-gray-700 pb-6">
        <h2 class="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
          📚 Mangas
        </h2>
        <p class="text-xl text-gray-700 dark:text-gray-300 mt-2">Top Mangas actualizados</p>
      </div>

      <SubCarousel :items="animeStore.itemsTopManga" class="enhanced-carousel" />
    </section>
  </div>
</template>

<script setup>
import Carousel from '../components/Carousel.vue';
import SubCarousel from '../components/SubCarousel.vue';
import { onMounted } from 'vue';
import { useAnimeStore } from '../stores/UseAnimeStore';

const animeStore = useAnimeStore();

onMounted(async () => {
  await animeStore.fetchSeason();
  await animeStore.fetchRecommend();
  await animeStore.fetchTopManga();
});
</script>

<style scoped>
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeSlideIn {
  animation: fadeSlideIn 0.8s ease-out both;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

:deep(.enhanced-carousel .card),
:deep(.enhanced-carousel .item) {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.enhanced-carousel .card:hover),
:deep(.enhanced-carousel .item:hover) {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
</style>
