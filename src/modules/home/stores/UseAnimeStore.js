import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSeasonNowAnime, getRecommendAnime, getTopAnime } from '../helpers/JikanAnimeClient'
import { getTopManga } from '../helpers/JikanMangaClient'


export const useAnimeStore = defineStore('anime', () => {
    const itemsSeason = ref([])
    const itemsRecommend = ref([])
    const itemsTopManga = ref([])
    const itemsTopAnime = ref([])

    const fetchSeason = async () => {
        if (itemsSeason.value.length > 0) return
        const data = await getSeasonNowAnime()
        itemsSeason.value = data.slice(0, 24).map(anime => ({
            id: anime.mal_id,
            image: anime.images.jpg.large_image_url || anime.images.webp.large_image_url,
            title: anime.title,
            type: anime.type,
            synopsis: anime.synopsis,
            category: 'anime'
        }))

        console.log("season: ",itemsSeason);
    }

    const fetchRecommend = async () => {
        if (itemsRecommend.value.length > 0 ) return
        const data = await getRecommendAnime()
        const recommended = []
        data.slice(0, 24).forEach(anime => {
            anime.entry.forEach(entry => {
                recommended.push({
                    id: entry.mal_id,
                    image: entry.images.jpg?.large_image_url || entry.images.webp?.large_image_url || '',
                    title: entry.title,
                    category: 'anime'
                })
            })
        })
        itemsRecommend.value = recommended
        console.log("recomendados: ",itemsRecommend);
    }

    const fetchTopManga = async () => {
        if (itemsTopManga.value.length > 0) return
        const data = await getTopManga()
        itemsTopManga.value = data.slice(0, 24).map(manga => ({
            id: manga.mal_id,
            image: manga.images.jpg.large_image_url || manga.images.webp.large_image_url,
            title: manga.title,
            type: manga.type,
            synopsis: manga.synopsis,
            category: 'manga'
        }))
        console.log("top manga: ",itemsTopManga);
    }

    const fetchTopAnime = async () => {
        if (itemsTopAnime.value.length > 0) return
        const data = await getTopAnime()
        itemsTopAnime.value = data.slice(0, 24).map(anime => ({
            id: anime.mal_id,
            image: anime.images.jpg.large_image_url || anime.images.webp.large_image_url,
            title: anime.title,
            type: anime.type,
            synopsis: anime.synopsis,
            category: 'anime'
        }))
        console.log("top anime: ",itemsTopAnime);
    }

    return {
        itemsSeason,
        itemsRecommend,
        itemsTopManga,
        itemsTopAnime,
        fetchSeason,
        fetchRecommend,
        fetchTopManga,
        fetchTopAnime
    }
},{
    persist: true
})