import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const updateUser = async (user) => {
  const { data } = await ispeakAPI.put(`/Usuario/Update/1234/${id}`, user)
  return data
}
