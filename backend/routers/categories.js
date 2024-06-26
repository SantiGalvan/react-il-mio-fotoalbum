const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.js");

// Rotta Store
router.post('/', categoriesController.store);

// Rotta Index
router.get('/', categoriesController.index);

// Rotta Show
router.get('/:slug', categoriesController.show);

// Rotta Update
router.put('/:slug', categoriesController.update);

// Rotta Delete
router.delete('/:slug', categoriesController.destroy);

module.exports = router;