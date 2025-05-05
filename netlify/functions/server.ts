import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerRoutes } from "../../server/routes"; 

const app = express();

app.use(cors());
app.use(bodyParser.json());


await registerRoutes(app); 

export const handler = serverless(app);
