import { ispeakAPI } from './IspeakAPI'

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const getUserById = async (idUser) => {
  const { data } = await ispeakAPI.get(`/Usuario/GetById/${idUser}/1234/${id}`)
  return data
}
