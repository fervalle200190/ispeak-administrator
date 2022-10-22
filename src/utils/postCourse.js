import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postCourse = async (course) => {
     const { data } = await ispeakAPI.post(`/Cursos/Create/1234/${id}`, course);
     return data;
};
