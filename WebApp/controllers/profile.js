"use strict";

var User = require('../models/user');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');
var resourceCheck = require('../lib/resourceCheck');

module.exports = function (router) {

	router.get('/:id*?', auth(), easySession.isLoggedIn(), function(req, res){
		
		if(!req.params.id){ 
			//Use session varibale instead of get variable
			User.findOne({_id: req.session.userID}, {role: 1, name: 1}, function(err, owner){
				
				if(err){
					console.error(err);
					throw err; //Handle better later...
				}
				var params = {
					userID: req.session.userID,
					ownerID: owner.id
				};				
				
				if(new resourceCheck(req, params)){
					var model = {user: owner};  
					return res.render('profile', model);
					
				}
				
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}
				
				/*
				req.session.can('account', params, function(err, has){
					if(err){ 
						//something went wrong with the check. Log error
						res.sendStatus(403);
						return;
					}
					
					if(!has){
						//User not allowed. 
						return res.sendStatus(403);
					}
					
					var model = {user: owner};
					
					return res.render('profile', model);
					
				});
				*/

			});
			
		}
		
		if(req.session.userID === req.params.id){
				
		        User.findOne({_id: req.params.id}, {role: 1, name: 1}, function(err, owner){
					if(err){
						console.error(err);
						throw err;
					}
					
					var params = {
						userID: req.session.userID,
						ownerID: owner.id
					};
									
					if(new resourceCheck(req, params)){
						var model = {user: owner};  
						return res.render('profile', model);
						
					}
					
					if(!(new resourceCheck(req, params))){
						return res.sendStatus(403);
					}
					
					/*	
					req.session.can('account', params, function(err, has){
						if(err){ 
						
							//something went wrong with teh check
							res.sendStatus(403);
							return;
						}
					
						if(!has){
							//Not allowed
							return res.sendStatus(403);
						}
						
						var model = {user: owner};  
		
						return res.render('profile', model);
						
					});
					*/
		
				});	
			
		}
		
	});

};
