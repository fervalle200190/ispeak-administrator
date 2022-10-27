import { id, ispeakAPI } from "./IspeakAPI";

export const postSignUp = async (signUp) => {
     try {
        const { data } = await ispeakAPI.post(`/Inscripciones/Create/1234/${id}`, signUp);
        return {
            ok: true,
            data
        }
     } catch (error) {
        return {
            ok: false,
            errorMessage: 'Ha ocurrido un error'
        }
     }
};
