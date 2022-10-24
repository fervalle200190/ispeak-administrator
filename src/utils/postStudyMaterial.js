import { ispeakAPI, id } from "./IspeakAPI";

export const postStudyMaterial = async (study) => {
     const { data } = await ispeakAPI.post(`/MaterialEstudios/Create/1234/${id}`, study);
     return data;
};
