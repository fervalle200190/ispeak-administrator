import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const updatePayment = async (payment) => {
     try {
          const { data } = await ispeakAPI.put(
               `/PasarelaMercadoPago/updatePayment/${apiKey}/${id}`,
               payment
          );
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
