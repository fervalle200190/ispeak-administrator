import { ispeakAPI, id } from "./IspeakAPI";

export const getAllBusinessUnits = async () => {
     const { data } = await ispeakAPI.get(`/Cursos/GetUnidadesNegocioCombo/${id}`);
     return data;
};
