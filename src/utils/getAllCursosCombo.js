import { ispeakAPI, id } from "./IspeakAPI"

export const getAllCursosCombo = async () => {
    const { data } = await ispeakAPI.get(`Cursos/GetAllComboPrograma/${id}`)
    return data
}
