const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const formattedErrors = error.details.map((err) => ({
                msg: err.message,
                param: err.context.key,
                location: 'body'
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: formattedErrors,
            });
        }

        req.body = value;
        next();
    };
};

module.exports = validateRequest;
