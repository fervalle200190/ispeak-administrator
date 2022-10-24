import { ispeakAPI, id } from "./IspeakAPI";

export const updateSupportMaterial = async (material) => {
     const res = await ispeakAPI.put(`/MaterialRefuerzo/Update/1234/${id}`, material);
     return res;
};
