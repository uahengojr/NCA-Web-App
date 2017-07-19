'use strict';

//var ProfileModel = require('../models/profile');

var User = require('../models/user');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    //var model = new ProfileModel();

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        res.render('profile', model);
        
    });

	router.get('/users/:id*?', auth(), easySession.isLoggedIn(), function(req, res){
		
		if(!req.params.id){ 
			//Use session varibale instead of get variable
			User.find({_id: req.session.userID}, function(err, owner){
				
				if(err){
					throw err; //Handle better later...
				}
				
				console.log("Hello One");
				console.log(req.params.userID);
				var model = {ownr: owner}; 
								
				res.render('profile', model);	

			}).limit(1);
			
		}else{
	
			var params = {
				userID: req.session.userID,
				ownerID: req.params.id //Owner of the object?
			};
						
			req.session.can('account', params, function(err, has){
				if(err || !has){
					return res.sendStatus(403);
				}
			
		        User.find({_id:req.session.userID}, function(err, owner){
					if(err){
						console.error(err);
						throw err;
					}
		
					var model = {ownr: owner};  
				
					console.log("Hello Two");
					console.log("\n");
					console.log(owner);
		
					res.render('profile', model);
		
				});	
				
			});
			
		}
		
	});

};
