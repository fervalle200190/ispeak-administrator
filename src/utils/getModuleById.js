import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getModuleById = async (moduleId) => {
     const { data } = await ispeakAPI.get(`/Modulos/GetById/${moduleId}/${id}`);
     return data;
};
