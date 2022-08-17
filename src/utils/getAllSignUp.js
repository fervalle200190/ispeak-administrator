import { ispeakAPI } from "./IspeakAPI"

export const getAllSignUp = async () => {
  const { data } = await ispeakAPI.get(`Inscripciones/GetAll/1234`)
  return data
}
