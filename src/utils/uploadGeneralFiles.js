import axios from "axios";
import { url } from "./IspeakAPI";

const id = JSON.parse(localStorage.getItem("LoggedUser")).id

export const uploadGeneralFiles = async (file) => {
     let formData = new FormData();
     formData.append('data', file)
     const { data } = await axios.post(
          `${url}MaterialEstudios/UploadGeneralFiles/1234/${id}`,
          formData
     );
     return data;
};
