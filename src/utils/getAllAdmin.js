import { ispeakAPI } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllAdmin = async () => {
     const { data } = await ispeakAPI.get(`Usuario/GetAllAdmin/1234/${id}`);
     return data;
};
