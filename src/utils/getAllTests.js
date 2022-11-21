import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const getAllTests = async () => {
     try {
          const { data } = await ispeakAPI(`/Test/GetAll/${apiKey}/`);
          return {
               ok: true,
               tests: data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
