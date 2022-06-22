import axios from "axios";
import { Request, Response } from "express";
import { authAxiosInstance } from "../../defaults/authAxiosInstance";
import { generateAxiosInstance } from "../../defaults/generateAxiosInstance";
import { ICredentials } from "../../interfaces/ICredentials";
import { redisClient } from "../../redis/client";

export const AuthController = {
    signin(req: Request, res: Response) {
        let login: string = req.body.login;
        let password: string = req.body.password;
        let credentials: ICredentials = {
            login: login,
            password: password,
        };

        authAxiosInstance({
            method: "POST",
            data: credentials,
        })
            .then((result) => {
                let token: string = result.data;
                redisClient
                    .set("SAAGIE_ACCESS_TOKEN", token)
                    .then(async (result) => {
                        if (result === "OK") {
                            return res.status(200).send({
                                message: `Saagie token saved into redis  ✅`,
                                token: await redisClient.get("SAAGIE_ACCESS_TOKEN"),
                            });
                        } else {
                            return res.status(500).send({
                                message: `An error occured when trying to save Saagie token saved into redis ❌`,
                                error: result,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                return res.status(404).send({
                    message: error,
                });
            });
    },
};
