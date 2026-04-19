const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const predictionValidator = require('../middlewares/predictionValidator');
const validateRequest = require('../middlewares/validateRequest');

router.post('/predict', predictionValidator,validateRequest, predictionController.predict);

module.exports = router;