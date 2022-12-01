import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsLogin = async () => {
     try {
          const resp = await ispeakAPI(`/Usuario/GetEstadisticasLogin/${id}`);
          return {
               ok: true,
               userStatistics: resp,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
