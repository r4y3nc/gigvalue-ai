const { body } = require('express-validator');

const predictionValidator = [
  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string'),

  body('experience_level')
    .notEmpty().withMessage('Experience level is required')
    .isIn(['Entry level', 'Intermediate', 'Expert']).withMessage('Experience level must be Entry level, Intermediate, or Expert'),

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