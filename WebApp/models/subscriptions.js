'use strict';

var mongoose = require('mongoose');

var Subscriptions = function() {
    
	/* - Defines Subscription Schema - */
	var Subscription = mongoose.Schema({
		
		name: {type: String, required: true, unique: true},
		amount: {type: String, required: true},
		description: {type: Buffer, required: true},
		subscribers: [{userID: String, subscription_type: String, amount: Number, time: {type: Date, default: Date.now}}],
		revenue: {type: Number, min: 0, default: 0, required: true},
		expiry_date: {type: Date, required: true},
		date_created: {type: Date, default: Date.now}
		
	});
	
	// - Helper functions - //

	Subscription.methods.canceled_subscription = function(subscriber){
		if(this.subscribers.length === 0){
			
			return;
			
		}else{
			
			var removeSubscriber = {
				userID: subscriber[ID],
				subscription_type: subscriber[type],
				amount: subscriber[amount]
			};
			
			this.subscribers.pop(removeSubscriber[userID]); 
			return;
			
		}
		
	};
	
	//Counters for total number of subscribers
	Subscription.methods.new_subscription = function(subscriber){
		if(this.subscribers.length === 0){
			
			return;
			
		}else{
			
			var newSubscriber = {
				userID: subscriber[ID],
				subscription_type: subscriber[type],
				amount: subscriber[amount]
			};
			
			this.subscribers.push(newSubscriber);
			return;
		}
	};
	
	Subscription.methods.addAmount = function(amount){
		if(this.revenue === 0 || this.revenue < 0){
			
			this.revenue = 0; //A lock must be attained to avoid race conditions.
			return;
			
		}else{
		
			this.revenue += amount;
			return;
		}
	};
	
	return mongoose.model('Subscription', Subscription);
};


module.exports = new Subscriptions();