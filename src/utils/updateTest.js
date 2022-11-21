import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const updateTest = async (test) => {
     try {
          const { data } = await ispeakAPI.put(`/TestUpdate/${apiKey}/`, test);
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
