import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllAttends = async () => {
     const { data } = await ispeakAPI.get(`/Asistencias/GetAll/1234/${id}`);
     return data;
};
