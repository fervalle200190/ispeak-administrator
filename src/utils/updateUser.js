import { ispeakAPI, id } from "./IspeakAPI";

export const updateUser = async (user) => {
     try {
          const { data } = await ispeakAPI.put(`/Usuario/Update/1234/${id}`, user);
          return data;
     } catch (error) {
          return false
     }
};
