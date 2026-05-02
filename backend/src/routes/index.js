const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const healthController = require('../controllers/healthController');
const skillsController = require('../controllers/skillsController');
const predictionValidator = require('../middlewares/predictionValidator');
const validateRequest = require('../middlewares/validateRequest');

router.post('/predict', predictionValidator,validateRequest, predictionController.predict);
router.get('/predictions', predictionController.getHistory);
router.get('/health', healthController.healthCheck);
router.get('/skills', skillsController.getSkills);

module.exports = router;