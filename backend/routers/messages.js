const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.js");
const validator = require('../middlewares/validator.js');
const { bodyData } = require("../validations/messages.js");
const validationToken = require("../middlewares/auth.js");
const { validationMessageId } = require("../validations/generalValidation.js");

// Rotta Store
router.post('/', validator(bodyData), messagesController.store);

// Validazione del Token
router.use('/', validationToken);

// Rotta Index
router.get('/', messagesController.index);

// Validazione dell'Id
router.use('/:id', validator(validationMessageId));

// Rotta Show
router.get('/:id', messagesController.show);

// Rotta Delete
router.delete('/:id', messagesController.destroy);

module.exports = router;