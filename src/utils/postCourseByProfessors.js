import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const postCourseByProfessors = async (list) => {
     try {
          const data = await ispeakAPI.post(`/Cursos/assignedTeacher/${apiKey}/${id}`, list);
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
