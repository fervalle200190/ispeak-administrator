import { ispeakAPI, id } from "./IspeakAPI";

export const getAllStudyMaterial = async () => {
     const { data } = await ispeakAPI.get(`/MaterialEstudios/GetAll/${id}`);
     return data;
};
