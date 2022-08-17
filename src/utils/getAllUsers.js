import { ispeakAPI } from "./IspeakAPI"

export const getAllUsers = async ()=> {
    const { data } = await ispeakAPI.get(`Usuario/GetAll/1234`)
    return data
}