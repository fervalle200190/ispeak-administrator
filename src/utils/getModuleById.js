import { ispeakAPI, id } from "./IspeakAPI";

export const getModuleById = async (moduleId) => {
     try {
          const { data } = await ispeakAPI.get(`/Modulos/GetById/${moduleId}/1234/`);
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
