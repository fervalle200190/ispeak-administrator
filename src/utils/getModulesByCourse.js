import { id, ispeakAPI } from "./IspeakAPI";

export const getModulesByCourse = async (cursoId) => {
     const { data } = await ispeakAPI.get(`/Modulos/GetByCurso/${cursoId}/${id}`);
     return data;
};
