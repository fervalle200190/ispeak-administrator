import { ispeakAPI, id } from "./IspeakAPI";

export const createPrograms = async (programs) => {
     try {
          const { data } = await ispeakAPI.post(`/Programas/Create/1234/${id}`, programs);
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
