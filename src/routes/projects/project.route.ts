import express, { Router } from "express";
import { ProjectController } from "../../controllers/projects/projectController";

const projectRoute: Router = express.Router();
projectRoute.get("/projects", ProjectController.getAll);
projectRoute.get("/project/:projectId", ProjectController.getById);
projectRoute.get("/duplicate/:projectId", ProjectController.duplicate);
projectRoute.delete("/project/:projectId");
export { projectRoute };
