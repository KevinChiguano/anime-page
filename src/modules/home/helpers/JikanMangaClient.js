import api from "@/helpers/api";


export const getTopManga = async () => {
    try {
        const response = await api.get('/top/manga');
        console.log(response.data)
        return response.data.data; // Retorna el array de manga
    } catch (error) {
        console.error('Error al obtener el top de manga:', error);
        return []; // En caso de error, retorna un array vacío
    }
};