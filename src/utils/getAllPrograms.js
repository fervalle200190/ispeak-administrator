import { id, ispeakAPI } from "./IspeakAPI"

export const getAllPrograms = async ()=> {
    const { data } = await ispeakAPI.get(`/Programas/GetAll/${id}`)
    return data
}