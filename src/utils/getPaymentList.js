import { apiKey, id, ispeakAPI } from "./IspeakAPI";

export const getPaymentList = async () => {
     const { data } = await ispeakAPI(`/PasarelaMercadoPago/GetPaymentsList/${apiKey}/${id}`);
     return {
          ok: true,
          payments: data,
     };
};
