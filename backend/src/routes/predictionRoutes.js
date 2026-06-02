const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const predictionSchema = require('../validators/predictionValidator');
const validateRequest = require('../middleware/validateRequest');
const { predictLimiter } = require('../middleware/rateLimiter');

router.post('/', predictLimiter, validateRequest(predictionSchema), predictionController.predict);

module.exports = router;
