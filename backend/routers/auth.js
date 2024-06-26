const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const validator = require("../middlewares/validator.js");
const { registerBody, loginBody } = require("../validations/users.js");

// Rotta Register
router.post('/register', validator(registerBody), authController.register);

// Rotta Login
router.post('/login', validator(loginBody), authController.login);

// Rotta Index
router.get('/users', authController.index);

module.exports = router;