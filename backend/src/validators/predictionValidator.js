const Joi = require('joi');

const predictionSchema = Joi.object({
  category: Joi.string().min(3).required().messages({
    'string.base': 'Category must be a string',
    'string.empty': 'Category is required',
    'string.min': 'Category must be at least 3 characters',
    'any.required': 'Category is required'
  }),
  experience_level: Joi.string().required().messages({
    'string.base': 'Experience level must be a string',
    'string.empty': 'Experience level is required',
    'any.required': 'Experience level is required'
  }),
  skills: Joi.array().items(Joi.string().messages({
    'string.base': 'Each skill must be a string'
  })).min(1).required().messages({
    'array.base': 'Skills must be an array',
    'array.min': 'Skills must be an array with at least 1 skill',
    'any.required': 'Skills is required'
  }),
  description: Joi.string().min(20).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 20 characters',
    'any.required': 'Description is required'
  }),
  country: Joi.string().optional().messages({
    'string.base': 'Country must be a string'
  }),
  client_rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Client rating must be a number',
    'number.min': 'Client rating must be between 0 and 5',
    'number.max': 'Client rating must be between 0 and 5'
  }),
  client_review_count: Joi.number().integer().min(0).max(9999).optional().messages({
    'number.base': 'Client review count must be a positive integer',
    'number.min': 'Client review count must be a positive integer',
    'number.max': 'Client review count must be between 0 and 9999',
    'number.integer': 'Client review count must be a positive integer'
  })
}).options({ stripUnknown: true });

module.exports = predictionSchema;
