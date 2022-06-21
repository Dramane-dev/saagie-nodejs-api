import { Request, Response } from "express";
import { axiosInstance } from "../../defaults/axiosInstance";

export const ProjectController = {
    getAllProjects(req: Request, res: Response) {
        let query: string = `query {
            projects {
                id,
                name,
                description
            }
        }`;

        axiosInstance({
            method: "post",
            data: {
                query,
            },
        })
            .then((result) => {
                res.status(200).send(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};
