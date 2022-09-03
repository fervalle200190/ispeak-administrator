import { id, ispeakAPI } from "./IspeakAPI";

export const deleteProgram = async (programId) => {
     const res = await ispeakAPI.delete(`/Programas/Delete/${programId}/1234/${id}`);
     return res;
};
