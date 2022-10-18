import { ispeakAPI } from "./IspeakAPI";

export const postLogin = async ({ email, password }) => {
     try {
          const dataToSend = JSON.stringify({
               email,
               password,
          });
          let res = await ispeakAPI.post(`/User/Login/1234`, dataToSend);
          return res;
     } catch (error) {
          return error
     }
};
