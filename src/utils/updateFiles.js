import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateFiles = async (fileModel, dataMaterial) => {
     const res = await ispeakAPI.put(
          `/MaterialEstudioUpdatefiles/${fileModel}/1234/${id}`,
          dataMaterial
     );
     return res;
};
