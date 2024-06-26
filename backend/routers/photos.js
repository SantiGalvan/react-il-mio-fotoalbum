const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos.js");

// Rotta Store
router.post('/', photosController.store);

// Rotta Index
router.get('/', photosController.index);

// Rotta Show
router.get('/:slug', photosController.show);

// Rotta update
router.put('/:slug', photosController.update);

// Rotta Delete
router.delete('/:slug', photosController.destroy);

module.exports = router;