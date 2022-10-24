import { ispeakAPI, id } from "./IspeakAPI";

export const getRoomById = async (roomId) => {
     const { data } = await ispeakAPI.get(`/Salas/GetById/${roomId}/${id}`);
     console.log(data);
};
