import { id, ispeakAPI } from "./IspeakAPI";

export const deleteAttend = async (attendId) => {
     try {
          const { data } = await ispeakAPI.delete(`/Asistencias/Delete/${attendId}/1234/${id}`);
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
