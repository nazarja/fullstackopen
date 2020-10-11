const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 3,
		unique: true,
		required: true
	},
	passwordHash: String,
	name: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = String(returnedObject._id);
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);