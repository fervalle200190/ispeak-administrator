import { ispeakAPI, id } from "./IspeakAPI";

export const postSupportMaterial = async (material) => {
     try {
          const { data } = await ispeakAPI.post(`/MaterialRefuerzo/Create/1234/${id}`, material);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: "Ha ocurrido un error",
          };
     }
};
