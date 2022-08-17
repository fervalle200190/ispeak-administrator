import axios from "axios";

export const ispeakAPI = axios.create({
     baseURL: "http://66.94.118.205:8080/api/",
     headers: { "Content-Type": "application/json" },
});
