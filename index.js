var GCM = require('./node-gcm-ccs');
var gcm = GCM('project id','api key');
var cron = require('cron');
var mongoose = require('mongoose');
var User = require('./models');

mongoose.connect('mongodb://127.0.0.1/webnewspushdb');

gcm.on('message',function(messageId, from, category, data) {
	console.log('got message',arguments);
	
	switch(data.action) {
		case 'register_new_client':
			var user = User({
				id: data.registration_token,
				username: data.username,
				notification: data.notification,
				newsgroup: data.newsgroup
			});

			user.save(function(err) {
				if(err) {
					console.log("Registration Error");
				} else {
					console.log("User registered");	
					gcm.send(from, {to: from, action: "register_new_client","status": "registered"}, {});
				}	
			});
			break;

		case 'unregister_client':
			User.findOneAndRemove({id: "registration_token"}, function(err) {
				if(err) {
					console.log('Error removing user from db');
				} else {
					console.log('User successfully removed');
					gcm.send(from, {to: from, action: "unregister_client", "status": "unregistered"},{});
				}	
			});
			break;
	}
});

gcm.on('receipt', function(messageId, from, category, data) {
	console.log('got receipt',arguments);	
});

gcm.on('connected', function() {
	console.log('connected');	
});
gcm.on('disconnected', function() {
	console.log('disconnected');
});
gcm.on('online', function() {
	console.log('online');	
});
gcm.on('error', function() {
	console.log('error');	
});


