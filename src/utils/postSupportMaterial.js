import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postSupportMaterial = async (material) => {
     const { data } = await ispeakAPI.post(
          `/MaterialRefuerzo/Create/1234/${id}`,
          material
     );
     return data;
};
