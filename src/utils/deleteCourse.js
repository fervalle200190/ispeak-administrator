import { id, ispeakAPI } from "./IspeakAPI";

export const deleteCourse = async (courseId) => {
     try {
          const { data } = await ispeakAPI.delete(`/Cursos/Delete/${courseId}/1234/${id}`);
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
