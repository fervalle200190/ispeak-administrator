import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const deleteUser = async (userId) => {
     const { data } = await ispeakAPI.delete(
          `/Usuario/Delete/${userId}/1234/${id}`
     );
     return data;
};
