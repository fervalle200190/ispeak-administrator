import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const postUser = async (user)=> {
    const { data } = await ispeakAPI.post(`Usuario/Create/1234/${id}`, user)
    return data
}