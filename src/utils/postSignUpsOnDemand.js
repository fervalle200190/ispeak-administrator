import { id, ispeakAPI } from "./IspeakAPI";

export const postSignUpsOnDemand = async () => {
     try {
          const { data } = await ispeakAPI(`/InscripcionesOnDemand/Create/1234/${id}`);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: "Ha ocurrido un problema",
          };
     }
};
