import { id, ispeakAPI } from "./IspeakAPI";

export const createCourseProgram = async (program) => {
     const { data } = await ispeakAPI.post(`Programas/CreateCurso/1234/${id}`, program);
     return data;
};
