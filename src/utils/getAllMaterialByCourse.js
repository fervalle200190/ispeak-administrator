import { ispeakAPI, id } from "./IspeakAPI";

export const getAllMaterialByCourse = async (courseId) => {
     const { data } = await ispeakAPI.get(
          `/MaterialRefuerzo/GetAllByCurso/${courseId}/${id}`
     );
     return data;
};
