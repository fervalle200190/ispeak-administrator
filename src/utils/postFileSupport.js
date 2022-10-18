import { id, ispeakAPI } from "./IspeakAPI";

export const postFileSupport = async (materialFile) => {
     const { data } = await ispeakAPI.post(
          `MaterialRefuerzo/CreateArchivo/1234/${id}`,
          materialFile
     );
     return data;
};
