import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllModules = async () => {
     const { data } = await ispeakAPI.get(`/Modulos/GetAll/${id}`);
     return data;
};
