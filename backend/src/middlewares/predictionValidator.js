const { body } = require('express-validator');

const predictionValidator = [
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ min: 20 }).withMessage('Description must be at least 20 characters')
];

module.exports = predictionValidator;