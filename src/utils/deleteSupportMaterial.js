import { id, ispeakAPI } from "./IspeakAPI";

export const deleteSupportMaterial = async (studyId) => {
     try {
          const { data } = await ispeakAPI.delete(`/MaterialRefuerzo/Delete/${studyId}/1234/${id}`);
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
