import { ispeakAPI, id } from "./IspeakAPI";

export const deleteUser = async (userId) => {
     const { data } = await ispeakAPI.delete(
          `/Usuario/Delete/${userId}/1234/${id}`
     );
     return data;
};
