const validateRequest = schema => async (req, res, next) => {

    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json(error.message)
    }

    next();
};

module.exports = validateRequest;