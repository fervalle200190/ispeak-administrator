import { ispeakAPI, id } from "./IspeakAPI";

export const getModuleById = async (moduleId) => {
     const { data } = await ispeakAPI.get(`/Modulos/GetById/${moduleId}/${id}`);
     return data;
};
