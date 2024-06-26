const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photos.js");
const validator = require('../middlewares/validator.js');
const { validationSlug } = require("../validations/generalValidation.js");
const { bodyData } = require("../validations/photos.js");
const validationToken = require("../middlewares/auth.js");

// Rotta Store
router.post('/', [validationToken, validator(bodyData)], photosController.store);

// Rotta Index
router.get('/', photosController.index);

// Validatore dello slug
router.use('/:slug', validator(validationSlug));

// Rotta Show
router.get('/:slug', photosController.show);

// Rotta update
router.put('/:slug', [validationToken, validator(bodyData)], photosController.update);

// Rotta Delete
router.delete('/:slug', validationToken, photosController.destroy);

module.exports = router;