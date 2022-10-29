import { id, ispeakAPI } from "./IspeakAPI";

export const deleteSignUp = async (signUpId) => {
     try {
          const { data } = await ispeakAPI.delete(`/Inscripciones/Delete/${signUpId}/1234/${id}`);
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
