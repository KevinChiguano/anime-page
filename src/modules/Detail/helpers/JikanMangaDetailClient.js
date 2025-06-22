import api from "@/helpers/api";


export const getDetailMangaById = async (id) => {
  try {
    const response = await api.get(`/manga/${id}/full`);
    console.log("Animes detalle id:", response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener el anime detalle:', error);
    return null; // En caso de error, retorna null
  }
};
