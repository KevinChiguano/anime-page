<template>
  <DetailAnimeItem v-if="category === 'anime'" :id="id" />
  <DetailMangaItem v-else-if="category === 'manga'" :id="id" />
  <div v-else class="text-center py-10 text-red-500">
    Tipo desconocido: {{ category }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import DetailAnimeItem from '../components/DetailAnimeItem.vue'
import DetailMangaItem from '../components/DetailMangaItem.vue'

const route = useRoute()
const id = ref(route.params.id)
const category = ref(route.params.category)
</script>
