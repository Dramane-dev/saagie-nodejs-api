import { redisClient } from "./client";

export const connection = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        redisClient
            .connect()
            .then(() => {
                resolve("Redis client connected successfully ✅");
            })
            .catch((err) => {
                reject(`Redis client error : ${err} ❌`);
            });
    });
};
