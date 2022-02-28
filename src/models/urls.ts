import { Schema, model } from "mongoose";
import type { URL } from "../types";

const URLSchema = new Schema<URL>({
    source: {
        type: String,
        required: true
    },
    visits: {
        type: Number,
        required: true
    },
    shortcode: {
        type: String,
        required: true
    },
    newURL: {
        type: String,
        required: true
    },
});

export const URLs = model<URL>('URLs', URLSchema);