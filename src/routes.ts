import { Express } from "express";

const routes = (app: Express) => {
    app.post('/url-shortener', (req, res) => {
        
    });

    // 20 urls
    app.get('/top-urls', (req, res) => {
        res.json({
            data: []
        });
    });

    // redirect to URL
    app.get(/([0-9])+/, (req, res) => {
        res.json({url: req.originalUrl});
    });
};

export default routes;