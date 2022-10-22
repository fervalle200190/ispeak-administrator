import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllCourses = async () => {
     let { data } = await ispeakAPI.get(`Cursos/GetAll/${id}`)
     return data;
};
