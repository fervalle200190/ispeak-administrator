import { id, ispeakAPI } from "./IspeakAPI"

export const createPrograms = async (programs) => {
  const { data } = await ispeakAPI.post(`/Programas/Create/1234/${id}`, programs)
  return data
}
