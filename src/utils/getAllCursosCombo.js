import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllCursosCombo = async () => {
    const { data } = await ispeakAPI.get(`Cursos/GetAllComboPrograma/${id}`)
    return data
}
