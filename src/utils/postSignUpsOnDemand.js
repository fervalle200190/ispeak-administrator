import { id, ispeakAPI } from "./IspeakAPI";

export const postSignUpsOnDemand = async (signUp) => {
     try {
          const { data } = await ispeakAPI.post(`/InscripcionesOnDemand/Create/1234/${id}`, signUp);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data || "Ha ocurrido un problema",
          };
     }
};
