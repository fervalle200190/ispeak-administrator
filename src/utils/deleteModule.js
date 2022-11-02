import { ispeakAPI, id } from "./IspeakAPI";

export const deleteModule = async (moduleId) => {
     try {
          const res = await ispeakAPI.delete(`/Modulos/Delete/${moduleId}/1234/${id}`);
          return {
               ok: true,
               res,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
