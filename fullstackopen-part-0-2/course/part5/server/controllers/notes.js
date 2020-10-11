const notesRouter = require('express').Router();
const Note = require('../models/notes');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7);
    }
    return null;
};

notesRouter.route('/')
    .get(async (req, res) => {
        const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
        return res.json(notes.map(note => note.toJSON()));
    })
    .post(async (req, res, next) => {
        const token = getTokenFrom(req);

        try {
            const decodedToken = jwt.verify(token, process.env.SECRET);

            if (!token || !decodedToken.id) {
                return res.status(401).json({ error: 'token missing or invalid' });
            }

            const user = await User.findById(decodedToken.id);

            const note = new Note({
                content: req.body.content,
                important: req.body.important === undefined ? false : req.body.important,
                date: new Date(),
                user: user._id
            });

            const savedNote = await note.save();
            user.notes = user.notes.concat(savedNote._id);
            await user.save();
            return res.json(savedNote.toJSON());
        }
        catch (err) { next(err); }
    });

notesRouter.route('/:id')
    .get(async (req, res, next) => {
        try {
            const note = await Note.find(req.params.id);
            if (note) return res.json(note.toJSON());
            else return res.status(404).end();
        }
        catch (err) { next(err); }
    })
    .put(async (req, res, next) => {
        const note = {
            content: req.body.content,
            important: req.body.important,
        };

        try {
            const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true });
            return res.json(updatedNote.toJSON());
        }
        catch (err) { next(err); }
    })
    .delete(async (req, res, next) => {
        try {
            await Note.findByIdAndRemove(req.params.id);
            return res.status(204).end();
        }
        catch (err) { next(err); }
    });

module.exports = notesRouter;
