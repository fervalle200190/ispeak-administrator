import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getProgramById = async (programId) => {
     const { data } = await ispeakAPI.get(
          `/Programas/GetById/${programId}/${id}`
     );
     return data;
};
