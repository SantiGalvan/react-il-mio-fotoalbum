const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const validator = require("../middlewares/validator.js");
const { registerBody, loginBody } = require("../validations/users.js");
const validationToken = require("../middlewares/auth.js");
const authSuperAdmin = require("../middlewares/authSuperAdmin.js");

// Rotta Register
router.post('/register', validator(registerBody), authController.register);

// Rotta Login
router.post('/login', validator(loginBody), authController.login);

// Validatore del Token e del Super Admin
router.use('/users', [validationToken, authSuperAdmin])

// Rotta Index
router.get('/users', authController.index);

// Rotta Delete
router.delete('/users/:email', authController.destroy);

module.exports = router;