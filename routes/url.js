const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleGetRedirectURL} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleGetRedirectURL);

module.exports = router; 


