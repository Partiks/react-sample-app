const mongoose =require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String
	},
	says: {
		type: String
	},
	status: {
		type: String
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
