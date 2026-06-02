const express = require('express');
const router = express.Router();

const predictionRoutes = require('./predictionRoutes');
const commonRoutes = require('./commonRoutes');

router.use('/predict', predictionRoutes);
router.use('/', commonRoutes);

module.exports = router;
