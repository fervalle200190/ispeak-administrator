import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getCourseById = async (courseId) => {
     const { data } = await ispeakAPI.get(`/Cursos/GetById/${courseId}/${id}`);
     return data;
};
