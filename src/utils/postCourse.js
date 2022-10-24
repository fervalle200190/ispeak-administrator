import { ispeakAPI, id } from "./IspeakAPI";

export const postCourse = async (course) => {
     const { data } = await ispeakAPI.post(`/Cursos/Create/1234/${id}`, course);
     return data;
};
