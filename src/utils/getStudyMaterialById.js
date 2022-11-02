import { ispeakAPI } from "./IspeakAPI";

export const getStudyMaterialById = async (studyId) => {
     try {
          const { data } = await ispeakAPI(`MaterialEstudios/GetById/${studyId}/1234`);
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
