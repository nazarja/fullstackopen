const logger = require('./logger');
const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		req.token = jwt.verify(authorization.substring(7), process.env.SECRET);
	}
	else {
		req.token = null;
	}
	next();
};

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
		return res.status(400).send({ error: 'malformatted id' });
	}
	else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}
	else if (err.name === 'InvalidCharacterLength') {
		return res.status(400).json({ error: err.message }).end();
	}
	else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	}

	next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor };