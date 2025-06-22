// helpers/TopAnimeClient.js
import api from "@/helpers/api";


export const getSeasonNowAnime = async () => {
    try {
        const response = await api.get('/seasons/now');
        console.log("Animes de temporada actual: ",response.data)
        return response.data.data; // Retorna el array de animes
    } catch (error) {
        console.error('Error al obtener el anime de temporada:', error);
        return []; // En caso de error, retorna un array vacío
    }
};
