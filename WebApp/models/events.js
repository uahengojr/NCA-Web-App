'use strict';

var mongoose = require('mongoose');

var event = function(){
	
	var eventSchema = mongoose.Schema({
		
		eventTitle: {
			majorTitle: String, 
			subTitle: String
		},
		creator: Object,
		imgLink: String,
		eventDescription: Buffer,
		location:{
			description: String,
			address: String, //Maybe make this a geoLocation property????
			city: String
		},
		phoneNumber1: String,
		eMail1: String,
		phoneNumber2: String,
		eMail2: String,
		eventDate: {
			type: Date
		},
		dateCreated: {
			type: Date, default: Date.now
		}, 
		published: {
			type: Boolean defaults: true
		}
	
	});
	
	/*
	eventSchema.methods.publish('save', function(next){
		var creator = this;
	});
	*/
	
	return mongoose.model('Event', eventSchema);
	
};

module.exports = new event();