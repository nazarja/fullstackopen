const logger = require('./logger');

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method);
    logger.info('Path:  ', req.path);
    logger.info('Body:  ', req.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ err: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ err: 'malformatted id' });
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json({ err: err.message });
    }
    else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ err: 'invalid token' });
    }

    next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };