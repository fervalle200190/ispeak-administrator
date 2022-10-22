import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateProgram = async (program) => {
     const { data } = await ispeakAPI.put(`/Programas/Update/1234/${id}`, program);
     return data;
};
