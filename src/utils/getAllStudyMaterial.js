import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllStudyMaterial = async () => {
     const { data } = await ispeakAPI.get(`/MaterialEstudios/GetAll/${id}`);
     return data;
};
