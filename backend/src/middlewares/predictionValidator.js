const { body } = require('express-validator');

const predictionValidator = [
  body('job_title')
    .notEmpty().withMessage('Job title is required')
    .isString().withMessage('Job title must be a string')
    .isLength({ min: 3 }).withMessage('Job title must be at least 3 characters'),

  body('experience_level')
    .notEmpty().withMessage('Experience level is required')
    .isIn(['Entry level', 'Intermediate', 'Expert']).withMessage('Experience level must be Entry level, Intermediate, or Expert'),

  body('skills')
    .notEmpty().withMessage('Skills is required')
    .isArray({ min: 1 }).withMessage('Skills must be an array with at least 1 skill'),

  body('skills.*')
    .isString().withMessage('Each skill must be a string'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters if provided'),
];

module.exports = predictionValidator;