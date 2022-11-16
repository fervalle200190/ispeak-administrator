import axios from "axios";
export const url = "https://api.ispeak.team/api";
export const apiKey = '1234'

export const id = JSON.parse(localStorage.getItem("LoggedUser"))? JSON.parse(localStorage.getItem("LoggedUser")).id: 0

export const ispeakAPI = axios.create({
     baseURL: url,
     headers: { "Content-Type": "application/json" },
});
