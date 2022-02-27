import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
routes(app);

const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
    console.log('Express server started on localhost: ' + port);
});