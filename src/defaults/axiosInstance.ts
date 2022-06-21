import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
jar.setCookie(
    `SAAGIETOKENDEMO=${String(process.env.ACCESS_TOKEN)}`,
    "https://demo-workspace.a4.saagie.io/projects/api/platform/2/graphql"
);

export const axiosInstance = wrapper(
    axios.create({
        baseURL: "https://demo-workspace.a4.saagie.io/projects/api/platform/2/graphql",
        withCredentials: true,
        jar: jar,
    })
);
