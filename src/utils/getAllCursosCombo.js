import { ispeakAPI } from "./IspeakAPI"

export const getAllCursosCombo = async () => {
    const { data } = await ispeakAPI.get(`Cursos/GetAllComboPrograma`)
    return data
}
