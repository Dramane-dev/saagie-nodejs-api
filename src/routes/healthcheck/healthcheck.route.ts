import express, { Router } from "express";
import { HealthcheckController } from "../../controllers/healthcheck/healthcheckController";

const healthcheckRoute: Router = express.Router();
healthcheckRoute.get("/healthcheck", HealthcheckController.health);
export { healthcheckRoute };
