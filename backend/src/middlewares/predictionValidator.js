const { body } = require('express-validator');

const predictionValidator = [
    body('job_title')
    .notEmpty().withMessage('Job title is required')
    .isString().withMessage('Job title must be a string')
    .isLength({ min: 3 }).withMessage('Job title must be at least 3 characters'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),

    body('skills')
    .notEmpty().withMessage('Skills is required')
    .isArray({ min: 1 }).withMessage('Skills must be an array with at least 1 skill'),

    body('skills.*')
    .isString().withMessage('Each skill must be a string'),
];

module.exports = predictionValidator;