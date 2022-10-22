import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllSupportMaterial = async () => {
     const { data } = await ispeakAPI.get(`MaterialRefuerzo/GetAll/${id}`);
     return data;
};
