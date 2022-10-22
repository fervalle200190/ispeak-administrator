import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postFileSupport = async (materialFile) => {
     const { data } = await ispeakAPI.post(
          `MaterialRefuerzo/CreateArchivo/1234/${id}`,
          materialFile
     );
     return data;
};
