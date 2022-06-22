import axios from "axios";

export const authAxiosInstance = axios.create({
    baseURL: String(process.env.SAAGIE_AUTH_URL),
    headers: {
        "Saagie-Realm": "demo",
    },
});
