import { ispeakAPI, id } from "./IspeakAPI";

export const updateFiles = async (fileModel, dataMaterial) => {
     const res = await ispeakAPI.put(
          `/MaterialEstudioUpdatefiles/${fileModel}/1234/${id}`,
          dataMaterial
     );
     return res;
};
