// helpers/TopAnimeClient.js
import api from "@/helpers/api";

export const getTopAnime = async () => {
    try {
        const response = await api.get('/top/anime');
        console.log(response.data)
        return response.data.data; // Retorna el array de animes
    } catch (error) {
        console.error('Error al obtener el top de anime:', error);
        return []; // En caso de error, retorna un array vacío
    }
};
