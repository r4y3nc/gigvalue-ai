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
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/predict', authMiddleware, predictLimiter, predictionValidator, validateRequest, predictionController.predict);
router.get('/predictions', authMiddleware, predictionController.getHistory);
router.get('/health', healthController.healthCheck);
router.get('/skills', skillsController.getSkills);
router.get('/categories', categoriesController.getCategories);
router.get('/experience-levels', experienceLevelsController.getExperienceLevels);
router.get('/profile', authMiddleware, profileController.getProfile);
router.post('/profile', authMiddleware, profileController.saveProfile);

module.exports = router;