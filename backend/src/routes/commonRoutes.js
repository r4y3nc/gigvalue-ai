const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthController');
const skillsController = require('../controllers/skillsController');
const rolesController = require('../controllers/rolesController');

router.get('/health', healthController.healthCheck);
router.get('/skills', skillsController.getSkills);
router.get('/roles', rolesController.getRoles);

module.exports = router;
