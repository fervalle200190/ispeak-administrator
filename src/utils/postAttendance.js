import { id, ispeakAPI } from "./IspeakAPI";

export const postAttendance = async (attendance) => {
     try {
          const { data } = await ispeakAPI.post(`/Asistencias/Create/1234/${id}`, attendance);
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
