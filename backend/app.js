const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.listen(port, host, () => {
    console.log(`Server attivo su http://${host}:${port}`);
});