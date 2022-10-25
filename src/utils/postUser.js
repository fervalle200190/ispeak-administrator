import { ispeakAPI, id } from "./IspeakAPI";

export const postUser = async (user) => {
     try {
          const { data } = await ispeakAPI.post(`Usuario/Create/1234/${id}`, user);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage:
                    error.response.data === "Este correo ya esta registrado"
                         ? error.response.data
                         : "Ha ocurrido un error",
          };
     }
};
