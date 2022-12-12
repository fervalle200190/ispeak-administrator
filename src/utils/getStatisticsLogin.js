import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsLogin = async (days) => {
     try {
          const { data } = await ispeakAPI(`/Usuario/GetEstadisticasActividad/${days}/${id}`);
          return {
               ok: true,
               userStatistics: data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
