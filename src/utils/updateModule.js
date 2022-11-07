import { ispeakAPI, id } from "./IspeakAPI";

export const updateModule = async (module) => {
     try {
          const { data } = await ispeakAPI.put(`/Modulos/Update/1234/${id}`, module);
          return {
               ok: true,
               data
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.message || 'Ha ocurrido un error'
          }
     }
};
