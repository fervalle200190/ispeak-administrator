import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllUsers = async ()=> {
    const { data } = await ispeakAPI.get(`Usuario/GetAll/1234/${id}`)
    return data
}