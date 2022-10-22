import { ispeakAPI } from "./IspeakAPI"

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const createPrograms = async (programs) => {
  const { data } = await ispeakAPI.post(`/Programas/Create/1234/${id}`, programs)
  return data
}
