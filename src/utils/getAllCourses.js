import { ispeakAPI } from "./IspeakAPI";

export const getAllCourses = async () => {
     let { data } = await ispeakAPI.get(`Cursos/GetAll`)
     return data;
};
