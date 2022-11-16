import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const updateAttendance = async (attend) => {
     try {
          const { data } = await ispeakAPI.put(`/Asistencias/Update/${apiKey}/${id}`, attend);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
