import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateCourse = async (course) => {
     const { data } = await ispeakAPI.put(`/Cursos/Update/1234/${id}`, course);
     return data;
};
