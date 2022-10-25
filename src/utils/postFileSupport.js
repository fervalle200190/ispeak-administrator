import { ispeakAPI, id } from "./IspeakAPI";

export const postFileSupport = async (materialFile) => {
     try {
          const { data } = await ispeakAPI.post(
               `MaterialRefuerzo/CreateArchivo/1234/${id}`,
               materialFile
          );
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: 'Ha ocurrido un error',
          };
     }
};
