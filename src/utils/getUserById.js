import { id, ispeakAPI } from './IspeakAPI'

export const getUserById = async (idUser) => {
  const { data } = await ispeakAPI.get(`/Usuario/GetById/${idUser}/1234/${id}`)
  return data
}
