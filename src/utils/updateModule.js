import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateModule = async (module) => {
     const { data } = await ispeakAPI.put(`/Modulos/Update/1234/${id}`, module);
     return data;
};
