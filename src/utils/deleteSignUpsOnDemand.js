import { id, ispeakAPI } from "./IspeakAPI";

export const deleteSignUpsOnDemand = async (signUpId) => {
     try {
          const { data } = await ispeakAPI.delete(`/InscripcionesOnDemand/Delete/${signUpId}/1234/${id}`);
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
