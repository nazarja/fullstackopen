const Note = require('../models/notes');
const User = require('../models/user');

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
        date: new Date()
    },
    {
        content: 'Browser can execute only Javascript',
        important: true,
        date: new Date()
    }
];

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' });
    await note.save();
    await note.remove();

    return note._id.toString();
};

const notesInDb = async () => {
    const notes = await Note.find({});
    return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialNotes, nonExistingId, notesInDb, usersInDb
};