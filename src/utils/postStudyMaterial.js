import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postStudyMaterial = async (study) => {
     const { data } = await ispeakAPI.post(`/MaterialEstudios/Create/1234/${id}`, study);
     return data;
};
