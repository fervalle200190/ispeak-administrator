import { ispeakAPI } from "./IspeakAPI";

export const getAllAttends = async () => {
     const { data } = await ispeakAPI.get(`/Asistencias/GetAll/1234`);
     return data;
};
