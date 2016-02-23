'use strict';

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	crypto = require('../lib/crypto');

var user = function(){
	
	/* - Defines user schema - */
	var userSchema = mongoose.Schema({
		name: {
			first: String, last: String
		},
		username: {
			type: String, sparse: true
		},
		email: {
			type: String, unique: true
		},
		sex: String,
		/*facebook:{
			id:
			token:
			email:
			name:
		}*/
		password: String,
		address: {
			shipping: {
				address1: String,
				address2: String,
				city: String,
				zip: String
			},
			billing:{ //Maybe don't store this ? Hmmmm....Check with Stripe & PayPal.
				address1: String,
				address2: String,
				city: String,
				zip: String
			}
		},
		phone_number: String,
		country: String,
		date_created: {type: Date, default: Date.now},
		/*hidden: Boolean, */
		role: String
	});
	
	
	/* - Helper function that hooks into the 'save' method replacing a plain-text password with a hashed version. - */
	userSchema.pre('save', function(next){
		var user = this;
		
	/* - If the password has not been modified since last operation, leave it alone (this avoids doublw hashing.) - */
		if(!user.isModified('passowrd')){
			next();
			return;	
		}
		
	/* - Encrypt the password using bcrypt. An async method is used insted of sync. - */
		bcypt.hash(user.password, crypto.getCryptoLevel(), function(err, hash){
			user.password =  hash;
		});
		
	//Continue onto the save opeation. ??????
		next();
	});

	
	/* - Helper function that hashes passwords - */
	userSchema.methods.hashPassword = bcrypt.hash(user.password, crypto.getCryptoLevel(), function(err, hash){
			user.password =  hash;
		});
	
	/* - Helper function comparing plaintext password and comparing it against the user's hashed password - */
	userSchema.methods.isValidPassword = function(plainText){
		var user = this;
		return bcrypt.compare(plainText, user.password);
	};
	
	return mongoose.model('User', userSchema);
	
}

module.exports = new user();