'use strict';

var Donation = require('../models/donations');
var easySession = require('easy-session');

module.exports = function (router) {

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['admin','board', 'user'])){
			
			Donation.find({}, function(err, donations){
				
				if(err){
					return console.error(err);
				}
				
				var model = {donations: donations};
			
				res.render('donations', model);
				
			});
        	
        }else{
			
        	return res.render('errors/404', {url:req.url});
			
        }
        
    }).post('/:donationID', easySession.isLoggedIn(), function(req, res){
		
		if(req.session.hasRole(['admin','board', 'user'])){
    			
			Donation.updateOne({_id: req.params.donationID}, function(err, donation){
				
				if(err){
					return console.error(err);
				}
				req.session.can('account', function(err, has){
					
					if(err || !has){
						return res.sendStatus(403);
					}
					
					
					var donor = {
						ID: req.session.userID,
						amount: req.body.amount
					};
					
					donation.addDonor(donor); 
					donation.addRevenue(donor[amount]);
					
					return res.send('Success' /*Some flash message here...*/);
					
				});
				
			});
			
    	}else{
			
        	return res.render('errors/404', {url:req.url});
			
        }
		
    });

};
