import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

const instance = axios.create({
    baseURL,
    timeout: 3000
});

export default instance;