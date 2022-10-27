import { id, ispeakAPI } from "./IspeakAPI";

export const getSignUpById = async (signId) => {
     const { data } = await ispeakAPI(`Inscripciones/GetById/${signId}/1234/${id}`);
     return data;
};
