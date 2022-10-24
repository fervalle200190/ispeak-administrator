import { ispeakAPI, id } from "./IspeakAPI";

export const getAllRooms = async () => {
     const { data } = await ispeakAPI.get(`/Salas/GetAll/${id}`);
     return data;
};
