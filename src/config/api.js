import axios from "axios";
import { baseUrl } from "./url";

const instance = axios.create({
    baseUrl: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default instance;
