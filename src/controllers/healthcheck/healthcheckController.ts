import { Request, Response } from "express";
import moment from "moment";
import { IHealthcheck } from "../../interfaces/IHealthcheck";

export const HealthcheckController = {
    health(req: Request, res: Response) {
        let result: IHealthcheck = {
            status: 200,
            serverIsRunningSince: process.uptime(),
            serverConnected: process.connected,
            pid: process.pid,
            message: `Server run successfully ${process.env.PORT} ✅`,
            date: moment().format("DD/MM/YYYY HH:mm:ss").toString(),
        };

        res.status(200).send(result);
    },
};
