const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const healthController = require('../controllers/healthController');
const skillsController = require('../controllers/skillsController');
const categoriesController = require('../controllers/categoriesController');
const experienceLevelsController = require('../controllers/experienceLevelsController');
const profileController = require('../controllers/profileController');
const predictionValidator = require('../middlewares/predictionValidator');
const validateRequest = require('../middlewares/validateRequest');
const { predictLimiter } = require('../middlewares/rateLimiter');

router.post('/predict', predictLimiter, predictionValidator, validateRequest, predictionController.predict);
router.get('/predictions', predictionController.getHistory);
router.get('/health', healthController.healthCheck);
router.get('/skills', skillsController.getSkills);
router.get('/categories', categoriesController.getCategories);
router.get('/experience-levels', experienceLevelsController.getExperienceLevels);

module.exports = router;