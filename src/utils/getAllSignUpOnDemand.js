import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllSignUpOnDemand = async () => {
     const { data } = await ispeakAPI.get(`InscripcionesOnDemand/GetAll/${id}`);
     return data;
};
