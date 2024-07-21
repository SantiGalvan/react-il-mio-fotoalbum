const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const cors = require("cors");
const photosRouter = require("./routers/photos.js");
const authRouter = require("./routers/auth.js");
const categoriesRouter = require("./routers/categories.js");
const messagesRouter = require("./routers/messages.js");
const errorHandler = require("./middlewares/errorHandler.js");
const notFound = require("./middlewares/notFound.js");

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

// Auth
app.use('/auth', authRouter);

// Photo
app.use('/photos', photosRouter);

// Category
app.use('/categories', categoriesRouter);

// Messaggi
app.use('/messages', messagesRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server attivo su ${host}:${port}`);
});