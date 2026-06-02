const { BadRequestError } = require('../errors');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map((err) => err.message).join(', ');

            return next(new BadRequestError(errorMessage));
        }

        req.body = value;
        next();
    };
};

module.exports = validateRequest;
