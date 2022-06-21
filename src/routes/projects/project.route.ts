import express, { Router } from "express";
import { ProjectController } from "../../controllers/projects/projectController";

const projectRoute: Router = express.Router();
projectRoute.get("/projects", ProjectController.getAllProjects);
export { projectRoute };
