import { Request, Response } from "express";
import util from "valid-url";


export const saveURL = (req: Request, res: Response) => {
    const URL: string = req.body.URL;

    if (util.isWebUri(URL)) {
        res.status(200).json({
            data: "" // add new URL
        });
    } else {
        res.status(400).json({
            message: "URL provided is invalid"
        });
    }
};

export const getTopURLs = (req: Request, res: Response) => {
    res.json({
        data: []
    });
};

export const redirectToURL = (req: Request, res: Response) => {
    res.json({
        data: []
    });
};