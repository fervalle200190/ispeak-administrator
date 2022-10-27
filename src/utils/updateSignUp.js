import { id, ispeakAPI } from "./IspeakAPI";

export const updateSignUp = async (signUp) => {
     try {
          const res = await ispeakAPI.put(`Inscripciones/Update/1234/${id}`, signUp);
          return {
               ok: true,
               res,
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || 'Ha ocurrido un error'
          }
     }
};
