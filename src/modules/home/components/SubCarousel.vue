<template>
    <div v-if="items.length" class="relative w-full group">
      <!-- Contenedor del carrusel -->
      <div class="relative flex items-center">
        <!-- Botones scroll (visibles solo en md+) -->
        <button
          @click="scrollLeft"
          class="hidden md:flex absolute left-0 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition -translate-x-1/2 opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
  
        <button
          @click="scrollRight"
          class="hidden md:flex absolute right-0 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition translate-x-1/2 opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
  
        <!-- Carrusel visible -->
        <div
          ref="carousel"
          class="overflow-x-auto w-full pl-2 pr-6 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          <div ref="scrollContent" class="flex gap-4">
            <CardItem
              v-for="(item, index) in items"
              :key="index"
              v-bind="item"
              class="card-item w-[160px] sm:w-[180px] md:w-[200px] snap-start shrink-0"
              @select="handleSelect"
            />
          </div>
        </div>
  
        <!-- Modal -->
        <div
          v-if="selectedItem"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-6"
        >
          <div
            class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800 relative animate-fade-in p-4 sm:p-6"
          >
            <button
              @click="closeModal"
              class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white transition text-xl"
            >
              ✖
            </button>
  
            <!-- Imagen -->
            <img
              :src="selectedItem.image"
              class="w-full h-52 sm:h-60 object-cover rounded-xl mb-4 shadow"
            />
  
            <!-- Título -->
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {{ selectedItem.title }}
            </h2>
  
            <!-- Sinopsis -->
            <div
              class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 max-h-40 overflow-y-auto pr-1"
            >
              {{ selectedItem.synopsis || 'Sin sinopsis disponible.' }}
            </div>
  
            <!-- Ver más -->
            <router-link
              :to="`/detalle/${selectedItem.category === 'manga' ? 'manga' : 'anime'}/${selectedItem.id}`"
              class="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Ver más
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, watch } from 'vue'
  import CardItem from './CardItem.vue'
  
  const scrollPosition = ref(0)
  const columnWidth = ref(204)
  const maxScroll = ref(0)
  
  const carousel = ref(null)
  const scrollContent = ref(null)
  const selectedItem = ref(null)
  const expanded = ref(false)
  
  function handleSelect(item) {
    selectedItem.value = item
    expanded.value = false
  }
  
  function closeModal() {
    selectedItem.value = null
  }
  
  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  })
  
  function scrollLeft() {
    carousel.value?.scrollBy({ left: -columnWidth.value, behavior: 'smooth' })
  }
  
  function scrollRight() {
    carousel.value?.scrollBy({ left: columnWidth.value, behavior: 'smooth' })
  }
  
  function updateColumnWidth() {
    const el = scrollContent.value?.querySelector('.card-item')
    if (el) {
      const style = window.getComputedStyle(el)
      const gap = parseFloat(window.getComputedStyle(scrollContent.value).gap || 0)
      const width = el.offsetWidth + gap
      columnWidth.value = width
      updateMaxScroll()
    }
  }
  
  function updateMaxScroll() {
    const containerWidth = carousel.value?.offsetWidth || 0
    const contentWidth = scrollContent.value?.scrollWidth || 0
    const max = contentWidth - containerWidth
    maxScroll.value = max > 0 ? max : 0
  
    if (scrollPosition.value > maxScroll.value) {
      scrollPosition.value = maxScroll.value
    }
  }
  
  onMounted(async () => {
    await nextTick()
    updateColumnWidth()
  
    const resizeObserver = new ResizeObserver(() => {
      updateColumnWidth()
    })
  
    if (carousel.value) resizeObserver.observe(carousel.value)
    if (scrollContent.value) resizeObserver.observe(scrollContent.value)
  })
  
  watch(() => props.items.length, async () => {
    await nextTick()
    updateColumnWidth()
  })
  </script>
  
  <style scoped>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  