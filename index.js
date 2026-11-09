const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => {
        console.log("MongoDB Connected\n");
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitedHistory: { timestamp: Date.now() },
            }
        }
    );

    if (!entry) {
        return res.status(404).send('URL not found');
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}\n`));



