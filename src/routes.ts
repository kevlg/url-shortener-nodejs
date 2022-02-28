import { Express } from "express";
import { saveURL, getTopURLs, redirectToURL } from "./controllers/URLsController";
import { login } from "./controllers/LoginController";

const routes = (app: Express) => {
    app.post('/login', login);

    app.post('/url-shortener', saveURL);

    // 20 urls
    app.get('/top-urls', getTopURLs);

    // redirect to URL
    app.get(/([0-9])+/, redirectToURL);
};

export default routes;