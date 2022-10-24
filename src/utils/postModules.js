import { ispeakAPI, id } from "./IspeakAPI";

export const postModules = async (module) => {
     const { data } = await ispeakAPI.post(`/Modulos/Create/1234/${id}`, module);
     return data
};
