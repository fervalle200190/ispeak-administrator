import { id, ispeakAPI } from "./IspeakAPI";

export const getSignUpOnDemandById = async (signUpId) => {
     const { data } = await ispeakAPI(`/InscripcionesOnDemand/GetById/${signUpId}/1234/`);
     return data;
};
