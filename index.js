var GCM = require('./node-gcm-ccs');
var gcm = GCM('project id','api key');
var mongoose = require('mongoose');
var User = require('./models');

mongoose.connect('mongodb://127.0.0.1/webnewspushdb');

gcm.on('message',function(messageId, from, category, data) {
	console.log('got message',arguments);		
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


