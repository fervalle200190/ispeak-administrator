import { ispeakAPI, id } from "./IspeakAPI";

export const getCourseById = async (courseId) => {
     const { data } = await ispeakAPI.get(`/Cursos/GetById/${courseId}/${id}`);
     return data;
};
