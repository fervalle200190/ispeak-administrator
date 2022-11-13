import { ispeakAPI, id } from "./IspeakAPI";

export const updateCourse = async (course) => {
     try {
          const { data } = await ispeakAPI.put(`/Cursos/Update/1234/${id}`, course);
          return {
               ok: true,
               data
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || 'Ha ocurrido un error'
          }
     }
};
