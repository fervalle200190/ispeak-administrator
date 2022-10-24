import { ispeakAPI, id } from "./IspeakAPI";

export const updateProgram = async (program) => {
     const { data } = await ispeakAPI.put(`/Programas/Update/1234/${id}`, program);
     return data;
};
