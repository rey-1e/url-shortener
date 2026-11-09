const { nanoid } = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req, res) {
    
    const body = req.body;
    const shortID = nanoid(8);
    
    if(!body.url) return res.status(400).json({error : 'url is required'});

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
    });
    
    return res.json({id : shortID});
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne( {shortId});

    if (!result) return res.status(404).json({ error: "URL not found" });

    return res.json( {totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

async function handleGetRedirectURL(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: { timestamp: Date.now() },
            }
        }
    );

    if (!entry) {
        return res.status(404).send('URL not found');
    }

    res.redirect(entry.redirectURL);
}

async function handleDeleteShortURL(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOneAndDelete({ shortId });

    if (!result) return res.status(404).json({ error: "URL not found" });

    return res.json({ status: "success", id: shortId });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetRedirectURL,
    handleDeleteShortURL,
}