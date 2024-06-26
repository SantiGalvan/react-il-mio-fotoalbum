const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");

// Rotta Register
router.post('/register', authController.register);

// Rotta Login
router.post('/login', authController.login);

// Rotta Index
router.get('/users', authController.index);

module.exports = router;