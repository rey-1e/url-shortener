const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGetRequestOnHome(req, res) {
    return res.status(200).json({status : "Make Post Request Here!"});
}

//function to create new short urls from given user-URLs
async function handleGenerateNewShortURL(req, res) {
    
    const body = req.body;
    const shortID = nanoid(8);
    
    if(!body.url) return res.status(400).json({error : 'url is required'});

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
    });
    
    const allUrls = await URL.find({});

    return res.render("home", {
        id: shortID,
        urls: allUrls,
    });
}

//function to get analytics of urls.
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne( {shortId});

    if (!result) return res.status(404).json({ error: "URL not found" });

    return res.json( {totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

//find the redirection link for that short-generated URL, and redirect to that. 
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

//uses find one and delete to delete the URL that it's requested on.
async function handleDeleteShortURL(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOneAndDelete({ shortId });

    if (!result) return res.status(404).json({ error: "URL not found" });

    return res.json({ status: "success", id: shortId });
}

//export all the functions created. 
module.exports = {
    handleGetRequestOnHome,
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetRedirectURL,
    handleDeleteShortURL,
}