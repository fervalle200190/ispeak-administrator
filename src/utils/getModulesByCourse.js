import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getModulesByCourse = async (cursoId) => {
     const { data } = await ispeakAPI.get(`/Modulos/GetByCurso/${cursoId}/${id}`);
     return data;
};
