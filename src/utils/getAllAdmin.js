import { ispeakAPI } from "./IspeakAPI";

export const getAllAdmin = async () => {
     const { data } = await ispeakAPI.get(`Usuario/GetAllAdmin/1234`);
     return data;
};
