import { id, ispeakAPI } from "./IspeakAPI";

export const getRoomsByCourse = async (courseId) => {
     const { data } = await ispeakAPI(`/Salas/GetByCurso/${courseId}/1234/`);
     return data
};
