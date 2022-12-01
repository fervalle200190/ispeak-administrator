import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsCountry = async () => {
     try {
          const { data } = await ispeakAPI(`/Usuario/GetEstadisticasPaises/${id}`);
          return {
               ok: true,
               countryStatistics: data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
