import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getRoomById = async (roomId) => {
     const { data } = await ispeakAPI.get(`/Salas/GetById/${roomId}/${id}`);
     console.log(data);
};
