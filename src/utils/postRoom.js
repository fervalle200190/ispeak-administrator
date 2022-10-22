import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postRoom = async (room) => {
     const { data } = await ispeakAPI.post(`/Salas/Create/1234/${id}`, room);
     return data;
};
