import { ispeakAPI, id } from "./IspeakAPI"

export const getAllSignUp = async () => {
  const { data } = await ispeakAPI.get(`Inscripciones/GetAll/1234/${id}`)
  return data
}
