/*
 * Defines schema for user data 
 *
 * notification represents which posts notify the user
 * newsgroup is the newsgroup who's posts notify the user if specified 
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: String,
	username: String,
	notification: Number,
	newsgroup: String
});

var User = mongoose.model('User', userSchema);
