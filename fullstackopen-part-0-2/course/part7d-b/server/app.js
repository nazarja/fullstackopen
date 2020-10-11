const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

// app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('Error connecting to MongoDB', err.message));

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/tests');
    app.use('/api/testing', testingRouter);
};

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;