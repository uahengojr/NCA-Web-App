'use strict';

var User = require('../models/user');
var Subscription = require('../models/subscriptions');
var Donation = require('../models/donations');

var testData = function(){
	
	return {
		//User test data
		addUsers: function() {
			var u1 = new User({
				'name.first': 'Gottlieb',
			    'name.last': 'Uahengo',
				email: 'uahengo@namib.com',
                password: 12345,
                role: 'user',
				sex: 'male',
				phone_number: 6517832059
			});
			
			u1.save();
		},
        UserSerialize: function(user, done) {
            done(null, user.id);
        },
        Userdeserialize: function(id, done) {
            User.findOne({
                _id: id
            }, function(err, user) {
                done(err, user);
            });
        },
		
		//Subscriptions test data
		addSubscriptions: function() {
			var s1 = new Subscription({
				name: 'NCA Annual Membership',
				amount: 120,
				description: new Buffer('<p><b>Testing: Subscriptions</b></p>', 'utf8').toString(), // -> idk
				expiry_date: new Date("December 31, 2017")
			});
			
			s1.save();
		},
		
        subscriptionSerialize: function(subscription, done) {
            done(null, subscription.id);
        },
        subscriptionDeserialize: function(id, done) {
            Subscription.findOne({
                _id: id
            }, function(err, subscription) {
                done(err, subscription);
            });
        },
		
		//Donations test data
		addDonations: function() {
			var d1 = new Donations({
				name: 'Drought Relief Funds',
				description: new Buffer('<p><b>Testing: Drought relief aid.</b></p>', 'utf8').toString()
			});
			
			d1.save();
		},
        donationSerialize: function(donation, done) {
            done(null, donation.id);
        },
        donationDeserialize: function(id, done) {
            Donation.findOne({
                _id: id
            }, function(err, donation) {
                done(err, donation);
            });
        }
	};
	
};

module.exports = testData;
