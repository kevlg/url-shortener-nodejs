import express from "express";
import routes from "./routes";
import cors from "cors";

import { authenticateToken } from "./controllers/AuthenticationMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateToken);

routes(app);

export default app;