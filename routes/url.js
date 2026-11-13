const express = require("express");
const {handleGetRequestOnHome, handleGenerateNewShortURL, handleGetAnalytics, handleGetRedirectURL, handleDeleteShortURL} = require("../controllers/url");

const router = express.Router();

router.get("/", handleGetRequestOnHome);

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleGetRedirectURL);

router.delete("/:shortId", handleDeleteShortURL);

module.exports = router; 


