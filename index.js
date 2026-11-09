const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require("./routes/url");
const { handleGetRedirectURL } = require('./controllers/url');
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => {
        console.log("MongoDB Connected\n");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:\n", err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);

app.get('/:shortId', handleGetRedirectURL);

app.listen(PORT, () => console.log(`Server Started at ${PORT}\n`));



