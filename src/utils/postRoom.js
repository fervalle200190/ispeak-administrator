import { ispeakAPI, id } from "./IspeakAPI";

export const postRoom = async (room) => {
     try {
          const { data } = await ispeakAPI.post(`/Salas/Create/1234/${id}`, room);
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
