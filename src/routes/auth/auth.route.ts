import express, { Router } from "express";
import { AuthController } from "../../controllers/auth/authController";

const authRoute: Router = express.Router();
authRoute.post("/signin", AuthController.signin);
export { authRoute };
