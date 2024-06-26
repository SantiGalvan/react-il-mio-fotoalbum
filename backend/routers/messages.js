const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.js");

// Rotta Store
router.post('/', messagesController.store);

// Rotta Index
router.get('/', messagesController.index);

// Rotta Show
router.get('/:id', messagesController.show);

// Rotta Delete
router.delete('/:id', messagesController.destroy);

module.exports = router;