import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const deleteProgram = async (programId) => {
     const res = await ispeakAPI.delete(`/Programas/Delete/${programId}/1234/${id}`);
     return res;
};
