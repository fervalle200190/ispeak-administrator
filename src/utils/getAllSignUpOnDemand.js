import { ispeakAPI, id } from "./IspeakAPI";

export const getAllSignUpOnDemand = async () => {
     const { data } = await ispeakAPI.get(`InscripcionesOnDemand/GetAll/${id}`);
     return data;
};
