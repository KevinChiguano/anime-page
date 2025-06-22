<template>
    <div v-if="anime" class="max-w-6xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100 space-y-10">

        <!-- Imagen y título -->
        <div class="flex flex-col md:flex-row gap-6">
            <img :src="anime.images.jpg.large_image_url" :alt="anime.title"
                class="rounded-2xl shadow-lg w-full md:w-1/3 object-cover" />

            <div class="flex-1 space-y-2">
                <h1 class="text-4xl font-bold">{{ anime.title }}</h1>
                <p class="italic text-gray-600 dark:text-gray-400">{{ anime.title_japanese }}</p>
                <p class="italic text-gray-600 dark:text-gray-400">{{ anime.title_english ||
                    'Título en inglés no disponible' }}
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-4">
                    <p><strong>Tipo:</strong> {{ anime.type }}</p>
                    <p><strong>Estado:</strong> {{ anime.status }}</p>
                    <p><strong>Episodios:</strong> {{ anime.episodes }}</p>
                    <p><strong>Duración:</strong> {{ anime.duration }}</p>
                    <p><strong>Emisión:</strong> {{ anime.aired.string }}</p>
                    <p><strong>Transmisión:</strong> {{ anime.broadcast.string }}</p>
                    <p><strong>Fuente:</strong> {{ anime.source }}</p>
                    <p><strong>Clasificación:</strong> {{ anime.rating }}</p>
                </div>

                <div class="text-sm mt-2">
                    <p><strong>Géneros:</strong> {{anime.genres.map(g => g.name).join(', ')}}</p>
                    <p><strong>Temas:</strong> {{anime.themes.map(t => t.name).join(', ') || 'N/A'}}</p>
                    <p><strong>Demografía:</strong> {{anime.demographics.map(d => d.name).join(', ') ||
                        'No especificada'}}</p>
                </div>

                <div class="text-sm mt-2">
                    <p><strong>Estudio:</strong> {{anime.studios.length ? anime.studios.map(s => s.name).join(', ') :
                        'No disponible'}}</p>
                    <p><strong>Productores:</strong> {{anime.producers.map(p => p.name).join(', ')}}</p>
                    <p><strong>Licenciadores:</strong> {{anime.licensors.length ? anime.licensors.map(l =>
                        l.name).join(', ') :
                        'No disponible'}}</p>
                </div>
            </div>
        </div>

        <!-- Sinopsis -->
        <section>
            <h2 class="text-2xl font-semibold mb-2">Sinopsis</h2>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">{{ anime.synopsis }}</p>
        </section>

        <!-- Estadísticas -->
        <section>
            <h2 class="text-2xl font-semibold mb-2">Estadísticas</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <p><strong>Puntaje:</strong> {{ anime.score }} (por {{ anime.scored_by }} usuarios)</p>
                <p><strong>Ranking:</strong> #{{ anime.rank }}</p>
                <p><strong>Popularidad:</strong> #{{ anime.popularity }}</p>
                <p><strong>Miembros:</strong> {{ anime.members }}</p>
                <p><strong>Favoritos:</strong> {{ anime.favorites }}</p>
            </div>
        </section>

        <!-- Trailer -->
        <section v-if="anime.trailer?.embed_url">
            <h2 class="text-2xl font-semibold mb-2">Trailer</h2>
            <div class="aspect-w-16 aspect-h-9">
                <iframe class="w-full rounded-xl" :src="anime.trailer.embed_url" frameborder="0"
                    allowfullscreen></iframe>
            </div>
        </section>

        <!-- Temas musicales -->
        <section v-if="anime.theme?.openings?.length || anime.theme?.endings?.length">
            <h2 class="text-2xl font-semibold mb-2">Temas Musicales</h2>

            <div v-if="anime.theme.openings.length">
                <h3 class="font-medium">Openings</h3>
                <ul class="list-disc ml-6 text-gray-700 dark:text-gray-300">
                    <li v-for="(song, index) in anime.theme.openings" :key="'opening-' + index">
                        {{ song }}
                        <a :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`"
                            target="_blank" class="ml-2 text-blue-500 dark:text-blue-400 hover:underline">
                            ▶ Escuchar
                        </a>
                    </li>
                </ul>
            </div>

            <div v-if="anime.theme.endings.length" class="mt-2">
                <h3 class="font-medium">Endings</h3>
                <ul class="list-disc ml-6 text-gray-700 dark:text-gray-300">
                    <li v-for="(song, index) in anime.theme.endings" :key="'ending-' + index">
                        {{ song }}
                        <a :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`"
                            target="_blank" class="ml-2 text-blue-500 dark:text-blue-400 hover:underline">
                            ▶ Escuchar
                        </a>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Relaciones -->
        <section v-if="anime.relations?.length">
            <h2 class="text-2xl font-semibold mb-2">Relaciones</h2>
            <ul class="list-disc ml-6 text-sm space-y-1">
                <li v-for="(relation, index) in anime.relations" :key="'relation-' + index">
                    <strong>{{ relation.relation }}:</strong>
                    <span v-for="(entry, idx) in relation.entry" :key="'entry-' + idx">
                        <a :href="entry.url" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">{{
                            entry.name
                        }}</a>
                        <span v-if="idx < relation.entry.length - 1">, </span>
                    </span>
                </li>
            </ul>
        </section>

        <!-- Enlaces externos -->
        <section v-if="anime.external?.length">
            <h2 class="text-2xl font-semibold mb-2">Enlaces Externos</h2>
            <ul class="list-disc ml-6">
                <li v-for="(link, index) in anime.external" :key="'external-' + index"
                    class="text-blue-600 dark:text-blue-400">
                    <a :href="link.url" target="_blank" class="hover:underline">{{ link.name }}</a>
                </li>
            </ul>
        </section>

    </div>

    <div v-else class="text-center text-gray-700 dark:text-gray-200 py-10">
        Cargando información del anime...
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { getDetailAnimeById } from '../helpers/JikanAnimeDetailClient'

// Props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const anime = ref(null)

const fetchAnimeDetails = async () => {
    try {
        const response = await getDetailAnimeById(props.id)
        anime.value = response
        console.log('Detalles del anime:', anime.value)
    } catch (error) {
        console.error('Error al obtener detalles del anime:', error)
    }
}

onMounted(fetchAnimeDetails)
watch(() => props.id, fetchAnimeDetails)
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