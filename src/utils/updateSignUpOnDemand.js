import { id, ispeakAPI } from "./IspeakAPI";

export const updateSignUpOnDemand = async (signUp) => {
     try {
          const { data } = await ispeakAPI.put(`/InscripcionesOnDemand/Update/1234/${id}`, signUp);
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
