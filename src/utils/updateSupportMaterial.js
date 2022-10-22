import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateSupportMaterial = async (material) => {
     const res = await ispeakAPI.put(`/MaterialRefuerzo/Update/1234/${id}`, material);
     return res;
};
