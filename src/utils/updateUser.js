import { id, ispeakAPI } from "./IspeakAPI"

export const updateUser = async (user) => {
  const { data } = await ispeakAPI.put(`/Usuario/Update/1234/${id}`, user)
  return data
}
