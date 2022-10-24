import { ispeakAPI, id } from "./IspeakAPI";

export const updateModule = async (module) => {
     const { data } = await ispeakAPI.put(`/Modulos/Update/1234/${id}`, module);
     return data;
};
