const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ],
    books: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Book'
    }],
});

bookSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Book', bookSchema);