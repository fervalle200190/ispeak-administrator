import { id, ispeakAPI } from "./IspeakAPI";

export const getAllRooms = async () => {
     const { data } = await ispeakAPI.get(`/Salas/GetAll/${id}`);
     return data;
};
