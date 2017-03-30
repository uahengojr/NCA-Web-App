'use strict';

var mongoose = require('mongoose');

var Subscriptions = function() {
    
	/* - Defines Subscription Schema - */
	var Subscription = mongoose.Schema({
		
		name: {type: String, required: true},
		amount: {type: String, required: true},
		description: {type: Buffer, required: true},
		num_of_subscribers: [{userID: ObjectId, subscription_type: String, amount: Number}],
		total_subscription_revenue: {type: Number, min: 0, default: 0, required: true},
		expiry_date: {type: Date, required: true},
		date_created: {type: Date, default: Date.now}
		
	});
	
	// - Helper functions - //

	Subscription.methods.canceled_subscription = function(subscriber){
		if(this.num_of_subscribers.length === 0){
			
			return;
			
		}else{
			
			var removeSubscriber = {
				userID: subscriber[ID],
				subscription_type: subscriber[type],
				amount: subscriber[amount]
			};
			
			this.num_of_subscribers.pop(removeSubscriber[userID]); 
			return;
			
		}
		
	};
	
	//Counters for total number of subscribers
	Subscription.methods.new_subscription = function(subscriber){
		if(this.num_of_subscribers.length === 0){
			
			return;
			
		}else{
			
			var newSubscriber = {
				userID: subscriber[ID],
				subscription_type: subscriber[type],
				amount: subscriber[amount]
			};
			
			this.num_of_subscribers.push(newSubscriber);
			return;
		}
	};
	
	Subscription.methods.addAmount = function(amount){
		if(this.total_subscription_revenue === 0 || this.total_subscription_revenue < 0){
			
			this.total_subscription_revenue = 0; //A lock must be attained to avoid race conditions.
			return;
			
		}else{
		
			this.total_subscription_revenue += amount;
			return;
		}
	};
	
	return mongoose.model('Subscription', Subscription);
};


module.exports = new Subscriptions();