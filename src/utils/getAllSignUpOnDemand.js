import { ispeakAPI } from "./IspeakAPI";

export const getAllSignUpOnDemand = async () => {
     const { data } = await ispeakAPI.get(`InscripcionesOnDemand/GetAll`);
     return data;
};
