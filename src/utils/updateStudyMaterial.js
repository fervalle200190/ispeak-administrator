import { id, ispeakAPI } from "./IspeakAPI";

export const updateStudyMaterial = async (studyMaterial) => {
     try {
          const { data } = await ispeakAPI.put(`MaterialEstudios/Update/1234/${id}`, studyMaterial);
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
