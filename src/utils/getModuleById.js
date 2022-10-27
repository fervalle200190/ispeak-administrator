import { ispeakAPI, id } from "./IspeakAPI";

export const getModuleById = async (moduleId) => {
     const { data } = await ispeakAPI.get(`/Modulos/GetById/${moduleId}/1234/${id}`);
     return data;
};
