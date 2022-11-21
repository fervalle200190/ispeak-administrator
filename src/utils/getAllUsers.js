import axios from "axios";
import { id, ispeakAPI } from "./IspeakAPI";

export const getAllUsers = async () => {
     const { data } = await axios.get(`http://66.94.118.205:5000/api/Usuario/GetAll/1234/${id}`);
     return data;
};
