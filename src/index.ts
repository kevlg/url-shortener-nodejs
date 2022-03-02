import 'dotenv/config' 
import express from "express";
import routes from "./routes";
import cors from "cors";

import { port, host } from "./utils";
import { authenticateToken } from "./controllers/AuthenticationMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateToken);

routes(app);

app.listen(port, host, () => {
    console.log(`Express server started on: ${host}:${port}`);
});
