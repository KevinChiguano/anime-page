<template>
    <div v-if="manga" class="max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 space-y-10">
  
      <!-- Imagen y título -->
      <div class="flex flex-col md:flex-row gap-6">
        <img :src="manga.images.jpg.large_image_url" :alt="manga.title"
          class="rounded-2xl shadow-lg w-full md:w-1/3  object-cover" />
  
        <div class="flex-1 space-y-2">
          <h1 class="text-4xl font-bold">{{ manga.title }}</h1>
          <p class="italic text-gray-600 dark:text-gray-400">{{ manga.title_japanese }}</p>
          <p class="italic text-gray-600 dark:text-gray-400">{{ manga.title_english || 'Título en inglés no disponible' }}</p>
  
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-4">
            <p><strong>Tipo:</strong> {{ manga.type }}</p>
            <p><strong>Estado:</strong> {{ manga.status }}</p>
            <p><strong>Capítulos:</strong> {{ manga.chapters || 'Desconocido' }}</p>
            <p><strong>Volúmenes:</strong> {{ manga.volumes || 'Desconocido' }}</p>
            <p class="sm:col-span-2"><strong>Publicado:</strong> {{ manga.published.string }}</p>
          </div>
  
          <div class="text-sm mt-2">
            <p><strong>Géneros:</strong> {{ manga.genres.map(g => g.name).join(', ') || 'No especificado' }}</p>
          </div>
  
          <div class="text-sm mt-2">
            <p><strong>Autores:</strong>
              <span v-if="manga.authors.length">
                <span v-for="(author, index) in manga.authors" :key="'author-' + index">
                  <a :href="author.url" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">
                    {{ author.name }}
                  </a><span v-if="index < manga.authors.length - 1">, </span>
                </span>
              </span>
              <span v-else>No disponible</span>
            </p>
  
            <p><strong>Serialización:</strong>
              <span v-if="manga.serializations.length">
                <span v-for="(magazine, index) in manga.serializations" :key="'magazine-' + index">
                  <a :href="magazine.url" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">
                    {{ magazine.name }}
                  </a><span v-if="index < manga.serializations.length - 1">, </span>
                </span>
              </span>
              <span v-else>No disponible</span>
            </p>
          </div>
        </div>
      </div>
  
      <!-- Sinopsis -->
      <section>
        <h2 class="text-2xl font-semibold mb-2">Sinopsis</h2>
        <p class="leading-relaxed text-gray-700 dark:text-gray-300">{{ manga.synopsis }}</p>
      </section>
  
      <!-- Estadísticas -->
      <section>
        <h2 class="text-2xl font-semibold mb-2">Estadísticas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <p><strong>Puntaje:</strong> {{ manga.score }} (por {{ manga.scored_by }} usuarios)</p>
          <p><strong>Ranking:</strong> #{{ manga.rank }}</p>
          <p><strong>Popularidad:</strong> #{{ manga.popularity }}</p>
          <p><strong>Miembros:</strong> {{ manga.members }}</p>
          <p><strong>Favoritos:</strong> {{ manga.favorites }}</p>
        </div>
      </section>
  
      <!-- Información adicional -->
      <section v-if="manga.background">
        <h2 class="text-2xl font-semibold mb-2">Información adicional</h2>
        <p class="leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ manga.background }}</p>
      </section>
  
    </div>
  
    <div v-else class="text-center text-gray-700 dark:text-gray-200 py-10">
      Cargando información del manga...
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { getDetailMangaById } from '../helpers/JikanMangaDetailClient'
  
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const manga = ref(null)
  
  const fetchMangaDetails = async () => {
    try {
      const response = await getDetailMangaById(props.id)
      manga.value = response
      console.log('Detalles del manga:', manga.value)
    } catch (error) {
      console.error('Error al obtener detalles del manga:', error)
    }
  }
  
  onMounted(fetchMangaDetails)
  watch(() => props.id, fetchMangaDetails)
  </script>
  
  <style scoped>
  .aspect-w-16 {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
  }
  
  .aspect-h-9 iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>
  