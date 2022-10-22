import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getAllSignUp = async () => {
  const { data } = await ispeakAPI.get(`Inscripciones/GetAll/1234/${id}`)
  return data
}
