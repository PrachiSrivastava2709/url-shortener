import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: {type: Number}}],
    },
    {timestamps: true}
);

const URL = model('urls', urlSchema)

export { URL };
