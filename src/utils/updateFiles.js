import { ispeakAPI, id } from "./IspeakAPI";

export const updateFiles = async (fileModel, dataMaterial) => {
     try {
          const { data } = await ispeakAPI.put(
               `/MaterialEstudioUpdatefiles/${fileModel}/1234/${id}`,
               dataMaterial
          );
          return {
               ok: true,
               data
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: 'Ha ocurrido un error'
          }
     }
};
