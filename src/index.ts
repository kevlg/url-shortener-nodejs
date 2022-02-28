import express from "express";
import routes from "./routes";

require('dotenv').config();
const app = express();

app.use(express.json());
routes(app);

const port = Number(process.env.EXPRESS_PORT) || 3000;
const host = process.env.EXPRESS_URL || "localhost";

app.listen(port, host, () => {
    console.log(`Express server started on: ${host}:${port}`);
});
