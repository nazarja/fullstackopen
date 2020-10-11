require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Person = require('./models/person');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const app = express();
const api = express.Router();

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan('tiny'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/info', async (req, res) => {
    await Person.count({})
        .then(count => {
            return res.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date}</p>
            `);
        });
});

api.route('/persons')
    .get((req, res, next) => {
        Person.find({})
            .then(people => res.json(people.map(person => person.toJSON())))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        if (!req.body.name || !req.body.number) return res.json({ 'error': 'Name or Number cannot be empty' });

        const person = new Person({
            name: req.body.name,
            number: req.body.number,
        });

        person.save()
            .then(savedPerson => res.json(savedPerson.toJSON()))
            .catch(err => next(err));
    });

api.route('/persons/:id')
    .get((req, res, next) => {
        Person.findById(req.params.id)
            .then(person => res.json(person.toJSON()))
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        Person.findByIdAndUpdate(req.params.id,
            { number: req.body.number },
            { new: true }
        )
            .then(updatedPerson => res.json(updatedPerson.toJSON()))
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Person.findByIdAndDelete(req.params.id)
            .then(() => res.status(204).end())
            .catch(err => next(err));
    });

const _404 = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ err: 'malformed id' });
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json({ err: err.message });
    }

    next(err);
};

app.use(_404);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));