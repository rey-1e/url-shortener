const express = require("express");
const { connectToMongoDB } = require('./connect')
const path = require("path");
const urlRoute = require("./routes/url");
const { handleGetRedirectURL, handleDeleteShortURL } = require('./controllers/url');

//create an express app
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//calling connectToMongoDB function from connect.js using mongodb link as a parameter. 
connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => {
        console.log("MongoDB Connected\n");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:\n", err);
    });


app.use(express.json());

//middleware
app.use(express.urlencoded({ extended: false }));

//requests over /url
app.use("/url", urlRoute);

app.get("/test", (req, res) => {
    return res.render("home");
});

//requests over /:shortId
app.get('/:shortId', handleGetRedirectURL);

//requests over /:shortId
app.delete('/:shortId', handleDeleteShortURL);

app.listen(PORT, () => console.log(`Server Started at ${PORT}\n`));
