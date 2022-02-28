import express from "express";
import routes from "./routes";

import { port, host } from "./utils";
import { authenticateToken } from "./controllers/AuthenticationMiddleware";


require('dotenv').config();
const app = express();

app.use(express.json());
app.use(authenticateToken);

routes(app);

app.listen(port, host, () => {
    console.log(`Express server started on: ${host}:${port}`);
});
