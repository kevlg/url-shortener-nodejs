import { Request, Response } from "express";
import util from "valid-url";
import { nanoid } from "nanoid";

import { connect } from "../models/connection";
import { URLs } from "../models/urls";

export const saveURL = async (req: Request, res: Response) => {
    const URL: string = req.body.URL;

    if (util.isWebUri(URL)) {
        await connect();

        const URLExists = await URLs.findOne({
            source: URL
        });

        if (URLExists) {
            res.status(200).json({
                data: URLExists.newURL
            });
        } else {
            const host = process.env.EXPRESS_URL || "localhost";
            const shortcode = nanoid();

            const newURL = new URLs({
                source: URL,
                visits: 0,
                shortcode,
                newURL: `${host}\/${shortcode}`
            });

            await newURL.save();

            res.status(200).json({
                data: newURL.newURL
            });
        }        
    } else {
        res.status(400).json({
            message: "The URL provided is invalid"
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