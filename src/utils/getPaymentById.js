import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const getPaymentById = async (paymentId) => {
     const { data } = await ispeakAPI(
          `/PasarelaMercadoPago/GetPaymentsById/${paymentId}/${apiKey}/${id}`
     );
     return {
          ok: true,
          payment: data,
     };
};
