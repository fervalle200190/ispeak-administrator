import { id, ispeakAPI } from "./IspeakAPI";

export const postProfessorsByCourse = async (list) => {
     try {
          const data = await ispeakAPI.post(`/Cursos/assignedTeachers/1234/${id}`, list);
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
