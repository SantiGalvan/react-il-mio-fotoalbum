const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.js");
const validator = require('../middlewares/validator.js');
const { validationCategorySlug } = require("../validations/generalValidation.js");
const { bodyData } = require("../validations/categories.js");

// Rotta Store
router.post('/', validator(bodyData), categoriesController.store);

// Rotta Index
router.get('/', categoriesController.index);

// Validatore dello slug delle categorie
router.use('/:slug', validator(validationCategorySlug));

// Rotta Show
router.get('/:slug', categoriesController.show);

// Rotta Update
router.put('/:slug', validator(bodyData), categoriesController.update);

// Rotta Delete
router.delete('/:slug', categoriesController.destroy);

module.exports = router;