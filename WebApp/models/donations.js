'use strict';

var mongoose = require('mongoose');

var Donations = function() {
   
	var Donation = mongoose.Schema({
		
		name: {type: String, unique: true, required: true},
		description: {type: Buffer, required: true},
		donors: [{userID: String, subscription_type: String, amount: Number, time: {type: Date, default: Date.now}}],
		donations_revenue: {type: Number, default: 0},
		expiry_date: {type: Date, required: true},
		date_created: {type: Date, default: Date.now},
		hidden: {type: Boolean, default: false}
	
	});
	
	// - Helper functions - //
	
	//Cancel/Delist Donation
	Donation.methods.isVisible = function(){
		this.hidden = true;
		return; 
	};
	
	//Counters for total number of subscribers
	Donation.methods.addDonor = function(donor){
		if(this.donors.length === 0){
			
			return;
			
		}else{
			
			var newDonor = {
				userID: donor[ID],
				amount: donor[amount]
			};
			
			this.donors.push(newDonor);
			return;
		}
	};
	
	//Tally Donations Made
	Donation.methods.addRevenue = function(donationAmount){
		if(this.donations_revenue === 0){
			
			return;
			
		}else{
			
			this.donations_revenue += donationAmount;
			return;
			
		}
	};
	

	return mongoose.model('Donation', Donation);
	
};

module.exports = new Donations();
