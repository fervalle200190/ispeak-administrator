import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postModules = async (module) => {
     const { data } = await ispeakAPI.post(`/Modulos/Create/1234/${id}`, module);
     return data
};
