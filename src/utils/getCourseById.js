import { id, ispeakAPI } from "./IspeakAPI";

export const getCourseById = async (courseId) => {
     const { data } = await ispeakAPI.get(`/Cursos/GetById/${courseId}/${id}`);
     return data;
};
