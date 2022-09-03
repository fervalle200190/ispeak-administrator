import { id, ispeakAPI } from "./IspeakAPI";

export const getAllCourses = async () => {
     let { data } = await ispeakAPI.get(`Cursos/GetAll/${id}`)
     return data;
};
