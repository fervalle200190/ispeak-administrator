import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const createCourseProgram = async (program) => {
     const { data } = await ispeakAPI.post(`Programas/CreateCurso/1234/${id}`, program);
     return data;
};
