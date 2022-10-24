import { ispeakAPI, id } from "./IspeakAPI";

export const updateCourse = async (course) => {
     const { data } = await ispeakAPI.put(`/Cursos/Update/1234/${id}`, course);
     return data;
};
