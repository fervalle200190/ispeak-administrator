import { ispeakAPI } from "./IspeakAPI";

export const postLogin = async ({ email, password }) => {
     try {
          const dataToSend = JSON.stringify({
               email,
               password,
          });
          let res = await ispeakAPI.post(`/User/Login/1234`, dataToSend);
          return {
               ...res,
               ok: true
          }
     } catch (error) {
          return {
               ok: false,
               error: error.response.data.message
          }
     }
};
