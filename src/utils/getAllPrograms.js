import { ispeakAPI, id } from "./IspeakAPI"

export const getAllPrograms = async ()=> {
    const { data } = await ispeakAPI.get(`/Programas/GetAll/${id}`)
    return data
}