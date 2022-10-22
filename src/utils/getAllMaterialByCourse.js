import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllMaterialByCourse = async (courseId) => {
     const { data } = await ispeakAPI.get(
          `/MaterialRefuerzo/GetAllByCurso/${courseId}/${id}`
     );
     return data;
};
