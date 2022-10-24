import { ispeakAPI, id } from "./IspeakAPI"

export const postUser = async (user)=> {
    const { data } = await ispeakAPI.post(`Usuario/Create/1234/${id}`, user)
    return data
}