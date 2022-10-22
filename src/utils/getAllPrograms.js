import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllPrograms = async ()=> {
    const { data } = await ispeakAPI.get(`/Programas/GetAll/${id}`)
    return data
}