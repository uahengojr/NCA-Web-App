"use strict";

var Donation = require('../models/donations');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['board', 'user']) && req.session.userID){
			
			Donation.find(function(err, donations){
				
				if(err){
					return console.error(err);
				}
				
				var model = {donations: donations};
			
				res.render('donations', model);
				
			});
        	
        }else{
			
        	return res.render('errors/404', {url:req.url});
			
        }
        
    }).post('/:donationID', auth(), easySession.isLoggedIn(), function(req, res){
		
		if(req.session.hasRole(['board', 'user'])){
    			
			Donation.updateOne({_id: req.params.donationID}, function(err, donation){
				
				if(err){
					return console.error(err);
				}
				//Perhaps add some resource check here later...
				var donor = {
					ID: req.session.userID,
					amount: req.body.amount
				};
				
				donation.addDonor(donor); 
				donation.addRevenue(donor[amount]);
				
				//Send an email to the user as well.
				return res.send('Success', req.flash('success', 'Thank you! You donation has been recieved.'));
				
			});
			
    	}else{
			
        	return res.render('errors/404', {url:req.url});
			
        }
		
    });

};
