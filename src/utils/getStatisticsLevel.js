import React from "react";
import { id, ispeakAPI } from "./IspeakAPI";

export const getStatisticsLevel = async () => {
     try {
          const { data } = await ispeakAPI(`/Usuario/GetEstadisticasNivel/${id}`);
          return {
               ok: true,
               levelStatistics: data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
