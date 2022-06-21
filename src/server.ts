import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import Main from "./class/Main";

const router: Express = express();
export const main = new Main(router);
main.startServer().then((res) => {
    console.log(res);
});
