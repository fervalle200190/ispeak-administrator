import { ispeakAPI, id } from "./IspeakAPI";

export const postCourse = async (course) => {
     try {
          const { data } = await ispeakAPI.post(`/Cursos/Create/1234/${id}`, course);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: "Ha ocurrido un error",
          };
     }
};
