import express from "express";

const app = express();

app.use(express.json());

const port = process.env.EXPRESS_PORT || 3000;

app.listen(port, () => {
    console.log('Express server started on localhost: ' + port);
});