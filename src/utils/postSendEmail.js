import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const postSendEmail = async (paymentId) => {
     try {
          const { data } = await ispeakAPI.put(
               `/PasarelaMercadoPago/reSendMail/${paymentId}/${apiKey}/${id}`
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
