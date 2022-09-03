import axios from "axios";
import { url } from "./IspeakAPI";

export const postFiles = async (file, urlFile) => {
     const newUrl = `${url}/${urlFile}`;
     const { data } = await axios(`${newUrl}`, {
          method: "POST",
          headers: {
               "Content-Type": "multipart/form-data; boundary",
          },
          data: file,
     });
     return data;
};
