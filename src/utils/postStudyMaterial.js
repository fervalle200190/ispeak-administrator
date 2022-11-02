import { ispeakAPI, id } from "./IspeakAPI";

export const postStudyMaterial = async (study) => {
     try {
          const { data } = await ispeakAPI.post(`/MaterialEstudios/Create/1234/${id}`, study);
          return {
               ok: true,
               data
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || 'Ha ocurrido un error'
          }
     }
};
