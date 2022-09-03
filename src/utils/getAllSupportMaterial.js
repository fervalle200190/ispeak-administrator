import { id, ispeakAPI } from "./IspeakAPI";

export const getAllSupportMaterial = async () => {
     const { data } = await ispeakAPI.get(`MaterialRefuerzo/GetAll/${id}`);
     return data;
};
