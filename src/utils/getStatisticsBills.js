import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsBills = async () => {
     const { data } = await ispeakAPI(`/Usuario/GetEstadisticasFacturacion/${id}`);
     return {
          ok: true,
          billsStatistics: data,
     };
};
