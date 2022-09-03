import { id, ispeakAPI } from "./IspeakAPI";

export const getAllModules = async () => {
     const { data } = await ispeakAPI.get(`/Modulos/GetAll/${id}`);
     return data;
};
