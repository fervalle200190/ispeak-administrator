import { ispeakAPI, id } from "./IspeakAPI"

export const createPrograms = async (programs) => {
  const { data } = await ispeakAPI.post(`/Programas/Create/1234/${id}`, programs)
  return data
}
