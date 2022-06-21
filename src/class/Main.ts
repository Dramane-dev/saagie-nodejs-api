import { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { healthcheckRoute } from "../routes/healthcheck/healthcheck.route";
import { authRoute } from "../routes/auth/auth.route";
import { projectRoute } from "../routes/projects/project.route";

export default class Main {
    constructor(private _router: Express, private _port?: number) {
        this._port = parseInt(String(process.env.PORT));
    }

    initialization(): void {
        this._router.use(bodyParser.json());
        this._router.use(cors());
        this._router.use("/api", healthcheckRoute);
        this._router.use("/api", authRoute);
        this._router.use("/api", projectRoute);
    }

    startServer(): Promise<object> {
        return new Promise(async (resolve, reject) => {
            await this.initialization();

            this._router.listen(this._port, async () => {
                resolve({
                    serverStatus: 200,
                    message: `Server ${process.pid} running on port ${this._port} ✅`,
                });
            });
        });
    }
}
