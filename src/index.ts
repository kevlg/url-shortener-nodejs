import express from "express";
import routes from "./routes";

import { port, host } from "./utils";

require('dotenv').config();
const app = express();

app.use(express.json());
routes(app);

app.listen(port, host, () => {
    console.log(`Express server started on: ${host}:${port}`);
});
