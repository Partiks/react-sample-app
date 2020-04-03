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
},
	{ collection: 'userdata' }
);

const UserData = mongoose.model('UserData', userSchema); //userData is the collection name in MongoDB's Partiks database

module.exports = UserData;
