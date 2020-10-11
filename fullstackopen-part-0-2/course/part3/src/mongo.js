const mongoURI = process.env.MONGO_URI;
const dotenv = require('dotenv').config();

mongoose.connect(mongoURI, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'A new Note',
    date: new Date(),
    important: true,
});

note.save().then(res => {
    console.log('note saved');
    console.log(res);
    mongoose.connection.close();
});

Note.find({ important: true }).then(res => {
    res.forEach(note => console.log(note));
    mongoose.connection.close();
});