import { ispeakAPI } from "./IspeakAPI";

export const getAllStudyMaterial = async () => {
     const { data } = await ispeakAPI.get(`/MaterialEstudios/GetAll`);
     return data;
};
