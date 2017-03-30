'use strict';

var Donations = function() {
   
	var Donation = mongoose.Schema({
		
		name: {type: String, required: true},
		description: {type: Buffer, required: true},
		num_of_donations: {type: Number, default: 0}, //If the server crashes, does MongoDb restart from defaults(0)?
		total_donations_revenue: {type: Number, default: 0, required: true},
		expiry_date: {type: Date, required:true},
		//date_created: {type: Date, default: Date.now},
		hidden: {type: Boolean, default: false, required: true}
	
	});
	
	// - Helper functions - //
	
	//Cancel/Delist Donation
	Donation.methods.isVisible = function(){
		this.hidden = true;
		return; 
	};
	
	//Tally Donations Made
	Donation.methods.addRevenue = function(donation){
		if(this.total_donations_revenue === 0){
			
			return;
			
		}else{
			this.num_of_donations += 1;
			this.total_donations_revenue += donation;
			return;
		}
	};
	
	
	return mongoose.model('Donation', Donation);
	
};

module.exports = new Donations()
