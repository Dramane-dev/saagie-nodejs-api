import axios from "axios";

export const authAxiosInstance = axios.create({
    baseURL: "https://demo-workspace.a4.saagie.io/authentication/api/open/authenticate",
    headers: {
        "Saagie-Realm": "demo",
    },
});
