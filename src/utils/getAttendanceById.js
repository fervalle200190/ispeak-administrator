import { id, ispeakAPI } from "./IspeakAPI";

export const getAttendanceById = async (attendId) => {
     try {
          const { data } = await ispeakAPI.get(`/Asistencias/GetById/${attendId}/1234/${id}`);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.message || "Ha ocurrido un error",
          };
     }
};
