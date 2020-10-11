const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose.set('useFindAndModify', false);
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(result => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongDB', err.message));

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Note', noteSchema);