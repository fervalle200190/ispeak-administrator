import { id, ispeakAPI } from "./IspeakAPI";

export const postRoom = async (room) => {
     const { data } = await ispeakAPI.post(`/Salas/Create/1234/${id}`, room);
     return data;
};
