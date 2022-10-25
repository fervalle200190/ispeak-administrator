import axios from "axios";
import { url, id } from "./IspeakAPI";

export const uploadGeneralFiles = async (file) => {
     try {
          let formData = new FormData();
          formData.append("data", file);
          const { data } = await axios.post(
               `${url}MaterialEstudios/UploadGeneralFiles/1234/${id}`,
               formData
          );
          return {
               ok: true,
               data
          }
     } catch (error) {
          return {
               ok: false,
               errorMessage: 'Ha ocurrido un error'
          }
     }
};
