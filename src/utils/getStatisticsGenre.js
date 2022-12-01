import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsGenre = async () => {
     try {
          const { data } = await ispeakAPI(`/Usuario/GetEstadisticasGenero/${id}`);
          return {
               ok: true,
               genreStatistics: data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
