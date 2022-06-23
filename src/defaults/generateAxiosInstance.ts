import axios, { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { redisClient } from "../redis/client";

export const generateAxiosInstance = (): Promise<AxiosInstance> => {
    return new Promise(async (resolve, reject) => {
        const jar = new CookieJar();

        jar.setCookie(
            `${process.env.SAAGIE_REALM}=${await redisClient.get("SAAGIE_ACCESS_TOKEN")}`,
            String(process.env.SAAGIE_GRAPHQL_URL)
        )
            .then(() => {
                resolve(
                    wrapper(
                        axios.create({
                            baseURL: String(process.env.SAAGIE_GRAPHQL_URL),
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
