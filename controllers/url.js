const { nanoid } = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req, res) {
    
    const body = req.body;
    const shortID = nanoid(8);
    
    if(!body.url) return res.status(400).json({error : 'url is required'});

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitedHistory: [],
    });

    return res.json({id : shortID});
}

module.exports = {
    handleGenerateNewShortURL,
}