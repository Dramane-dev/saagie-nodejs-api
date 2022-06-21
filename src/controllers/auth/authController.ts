import { Request, Response } from "express";
import { axiosInstance } from "../../defaults/axiosInstance";

export const AuthController = {
    generateToken(req: Request, res: Response) {
        axiosInstance
            .post("")
            .then((res) => {})
            .catch((error) => {});
    },
};
