const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const healthController = require('../controllers/healthController');
const skillsController = require('../controllers/skillsController');
const rolesController = require('../controllers/rolesController');

const predictionSchema = require('../middlewares/predictionValidator');
const validateRequest = require('../middlewares/validateRequest');
const { predictLimiter } = require('../middlewares/rateLimiter');

router.post('/predict', predictLimiter, validateRequest(predictionSchema), predictionController.predict);

router.get('/health', healthController.healthCheck);
router.get('/skills', skillsController.getSkills);
router.get('/roles', rolesController.getRoles);

module.exports = router;
