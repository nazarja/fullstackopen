const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5
    },
    phone: {
      type: String,
      minlength: 5
    },
    street: {
      type: String,
      required: true,
      minlength: 5
    },
    city: {
      type: String,
      required: true,
      minlength: 3
    },
  });

personSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person', personSchema)