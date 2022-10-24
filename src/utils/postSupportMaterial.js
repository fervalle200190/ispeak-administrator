import { ispeakAPI, id } from "./IspeakAPI";

export const postSupportMaterial = async (material) => {
     const { data } = await ispeakAPI.post(
          `/MaterialRefuerzo/Create/1234/${id}`,
          material
     );
     return data;
};
