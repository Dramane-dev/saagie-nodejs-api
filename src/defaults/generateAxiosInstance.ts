import axios, { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { redisClient } from "../redis/client";

export const generateAxiosInstance = (): Promise<AxiosInstance> => {
    return new Promise(async (resolve, reject) => {
        const jar = new CookieJar();
        jar.setCookie(
            `${process.env.SAAGIE_REALM}=${await redisClient.get("SAAGIE_ACCESS_TOKEN")}`,
            "https://demo-workspace.a4.saagie.io/projects/api/platform/2/graphql"
        )
            .then(() => {
                resolve(
                    wrapper(
                        axios.create({
                            baseURL: "https://demo-workspace.a4.saagie.io/projects/api/platform/2/graphql",
                            withCredentials: true,
                            jar: jar,
                        })
                    )
                );
            })
            .catch((error) => {
                reject(error);
            });
    });
};
