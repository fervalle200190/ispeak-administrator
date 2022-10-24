import { ispeakAPI, id } from "./IspeakAPI";

export const getProgramById = async (programId) => {
     const { data } = await ispeakAPI.get(
          `/Programas/GetById/${programId}/${id}`
     );
     return data;
};
