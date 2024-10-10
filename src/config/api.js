import axios from "axios";
import { baseUrl } from "./url";

// Retrieve the token from localStorage
const token = localStorage.getItem('lead_token');

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ''  // Add token to Authorization header if it exists
    },
    withCredentials: true
});

export default instance;
