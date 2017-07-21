'use strict';

//var ProfileModel = require('../models/profile');

var User = require('../models/user');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    //var model = new ProfileModel();

	router.get('/:id*?', auth(), easySession.isLoggedIn(), function(req, res){
		
		if(!req.params.id){ 
			//Use session varibale instead of get variable
			User.find({_id: req.session.userID}, {role: 1, name: 1, _id: 0}, function(err, owner){
				
				if(err){
					throw err; //Handle better later...
				}
				
				console.log("Hello One");
				var model = {ownr: owner}; 
								
				res.render('profile', model);	

			}).limit(1);
			
		}
		
		if(req.session.userID === req.params.id || req.session.role === 'admin' ){
	
			var params = {
				userID: req.session.userID,
				ownerID: req.params.id //Owner of the object?
			};
						
			req.session.can('account', params, function(err, has){
				if(err || !has){
					return res.sendStatus(403);
				}
			
		        User.find({_id: params.ownerID}, {role: 1, name: 1, _id: 0}, function(err, owner){
					if(err){
						console.error(err);
						throw err;
					}
		
					var model = {ownr: owner};  
				
					console.log("Hello Two");
					console.log(owner);
		
					res.render('profile', model);
		
				});	
				
			});
			
		}
		
	});

};
