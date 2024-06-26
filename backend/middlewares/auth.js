const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const validationToken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new Error('Token non fornito');

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) throw new Error('Token non valido');

        req.user = data;
        next();
    });
}

module.exports = validationToken;