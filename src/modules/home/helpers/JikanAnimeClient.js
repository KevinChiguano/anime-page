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

export const getTopAnime = async () => {
    try {
        const response = await api.get('/top/anime');
        console.log("Top anime: ",response.data)
        return response.data.data; // Retorna el array de animes
    } catch (error) {
        console.error('Error al obtener el top de anime:', error);
        return []; // En caso de error, retorna un array vacío
    }
};


export const getRecommendAnime = async () => {
    try {
        const response = await api.get('/recommendations/anime');
        console.log("Animes Recomendados",response.data)
        return response.data.data; // Retorna el array de animes
    } catch (error) {
        console.error('Error al obtener anime recomendado:', error);
        return []; // En caso de error, retorna un array vacío
    }
};

