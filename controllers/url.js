import { nanoid } from "nanoid";
import { URL } from '../models/url.js';

async function generateNewShortURL(req, res){
    const body = req.body
    if (!body.url) {
        return res.status(400).json({error: 'url is required'})
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({id: shortID})
}

async function redirectURL(req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(entry.redirectURL)
}

async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

export { generateNewShortURL, redirectURL, getAnalytics } 
