import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://productos-backend-nodejs.herokuapp.com/api",
})