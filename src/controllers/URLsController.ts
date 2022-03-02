import { Request, Response } from "express";
import util from "valid-url";
import { nanoid } from "nanoid";

import { connect } from "../models/connection";
import { URLs } from "../models/urls";
import { port, host } from "../utils";

function getProtocol(req: Request) {
    return req.secure ? 'https' : 'http';
}

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
            const shortcode = nanoid();
            const internalURL = `${getProtocol(req)}://${host}:${port}\/${shortcode}`;

            const newURL = new URLs({
                source: URL,
                visits: 0,
                shortcode,
                newURL: internalURL
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

export const getTopURLs = async (req: Request, res: Response) => {
    await connect();
    
    const topURLs = await URLs.find({}).sort({ visits: 'desc' }).limit(20);
    res.json({
        data: topURLs
    });
};

export const redirectToURL = async (req: Request, res: Response) => {
    let shortcode = req.url;
    if (shortcode.length > 2) {
        shortcode = shortcode.substring(1, shortcode.length);
    }

    await connect();

    const redirectTo = await URLs.findOne({ shortcode });

    if (redirectTo) {
        const result = await redirectTo.updateOne({$inc: { visits: 1 }});
        if (result.modifiedCount === 1) {
            return res.redirect(redirectTo.source);
        }
    } 

    res.status(404).json({
        message: "404 NOT FOUND"
    });
};