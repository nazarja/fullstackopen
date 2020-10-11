const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Note = require('./models/note');
const PORT = process.env.PORT || 3001;

app.use(express.static('build'))
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('index.html');
});

app.route('/api/notes')
    .get((req, res, next) => {
        Note.find({})
            .then(notes => {
                res.json(notes.map(note => note.toJSON()));
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        if (!req.body.content) {
            return Response.status(400).json({
                error: "content missing"
            });
        }

        const note = new Note({
            content: req.body.content,
            important: req.body.important || false,
            date: new Date()
        });

        note.save()
            .then(savedNote => savedNote.toJSON())
            .then(savedAndFormattedNote => res.json(savedAndFormattedNote))
            .catch(err => next(err));
    });


app.route('/api/notes/:id')
    .get((req, res, next) => {
        Note.findById(req.params.id)
            .then(note => {
                if (note) res.json(note.toJSON())
                else res.status(404).end();
            })
            .catch(err => next(err))
    })
    .put((req, res, next) => {
        Note.findByIdAndUpdate(req.params.id,
            { important: body.important },
            { new: true }
        )
            .then(updatedNote => res.json(updatedNote.toJSON()))
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Note.findByIdAndRemove(req.params.id)
            .then(result => res.status(204).end())
            .catch(err => next(err));

    });

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformed id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    };

    next(err);
};

// custom middleware
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));