import { ispeakAPI } from "./IspeakAPI";

export const postLogin = async ({ email, password }) => {
     const dataToSend = JSON.stringify({
          email,
          password,
     });
     let res = await ispeakAPI.post(`/User/Login/1234`, dataToSend);
     return res;
};
