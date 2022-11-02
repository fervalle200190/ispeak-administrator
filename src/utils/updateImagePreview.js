import axios from "axios";
import { id, ispeakAPI, url } from "./IspeakAPI";

export const updateImagePreview = async (studyId, file) => {
     try {
          let formData = new FormData();
          formData.append("data", file);
          const { data } = await axios.post(
               `${url}/MaterialEstudios/UpdatePreviewVideo/${studyId}/1234/${id}`,
               formData
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
