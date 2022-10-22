import axios from "axios";
export const url = "https://api.ispeak.team/api";

export const ispeakAPI = axios.create({
     baseURL: url,
     headers: { "Content-Type": "application/json" },
});
