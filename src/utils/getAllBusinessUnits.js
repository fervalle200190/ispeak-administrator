import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllBusinessUnits = async () => {
     const { data } = await ispeakAPI.get(`/Cursos/GetUnidadesNegocioCombo/${id}`);
     return data;
};
