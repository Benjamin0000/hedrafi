import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; 
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
    },
});

export default api;