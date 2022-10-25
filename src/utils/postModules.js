import { ispeakAPI, id } from "./IspeakAPI";

export const postModules = async (module) => {
     try {
          const { data } = await ispeakAPI.post(`/Modulos/Create/1234/${id}`, module);
          return {
               ok: true,
               data
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: 'Ha ocurrido un error'
          }
     }
};
