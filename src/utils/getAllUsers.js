import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const getAllUsers = async () => {
     const { data } = await ispeakAPI(`/Usuario/GetAll/${apiKey}/${id}`);
     return data;
};
