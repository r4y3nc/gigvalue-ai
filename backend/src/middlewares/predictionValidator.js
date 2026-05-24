const { body } = require('express-validator');

const predictionValidator = [
  body('category')
    .notEmpty().withMessage('Category is required')
    .isString().withMessage('Category must be a string')
    .isLength({ min: 3 }).withMessage('Category must be at least 3 characters'),

  body('experience_level')
    .notEmpty().withMessage('Experience level is required')
    .isString().withMessage('Experience level must be a string'),

  body('skills')
    .notEmpty().withMessage('Skills is required')
    .isArray({ min: 1 }).withMessage('Skills must be an array with at least 1 skill'),

  body('skills.*')
    .isString().withMessage('Each skill must be a string'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),

  body('country')
    .optional()
    .isString().withMessage('Country must be a string'),

  body('client_rating')
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage('Client rating must be between 0 and 5'),

  body('client_review_count')
    .optional()
    .isInt({ min: 0 }).withMessage('Client review count must be a positive integer'),
];

module.exports = predictionValidator;