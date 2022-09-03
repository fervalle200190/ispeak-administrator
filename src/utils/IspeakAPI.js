import axios from "axios";
export const url = "http://66.94.118.205:8080/api/"

export const id = !!localStorage.getItem("LoggedUser")
     ? JSON.parse(localStorage.getItem("LoggedUser")).id
     : 0;

export const ispeakAPI = axios.create({
     baseURL: url,
     headers: { "Content-Type": "application/json" },
});
