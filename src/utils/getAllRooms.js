import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllRooms = async () => {
     const { data } = await ispeakAPI.get(`/Salas/GetAll/${id}`);
     return data;
};
