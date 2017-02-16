'use strict';

var ProfileModel = require('../models/profile');

var User = require('../models/user');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new ProfileModel();

    router.get('/', function (req, res) {
        
        res.render('profile', model);
        
    });

	router.get('/users/:id*?', easySession.isLoggedIn(), function(req, res){
		
		if(!req.params.id){ 
			//Use session varibale instead of get variable
			User.find({_id: req.session.userID}, function(err, owner){
				
				if(err){
					throw err; //Handle better later...
				}
				console.log("Hello One");
				console.log(req.params.userID);
				var model = {ownr: owner}; 
				//console.log(owner);
				
				res.render('profile', model);	
				return;
			}).limit(1);
			
		}else{
	
		var params = {
			userId: req.session.userID,
			ownerId: req.params.id //Owner of the object?
		};
		
		req.session.can('account', params, function(err, has){
			if(err || !has){
				res.sendStatus(403);
				return;
			}
			User.find({_id: params.userId}, function(err, owner){
				if(err){
					throw err;
				}
				
				var model = {ownr: owner};  
				
				console.log("Hello Two");
				console.log("\n");
				console.log(owner);
				
				res.render('profile', model);	
				return;
			}).limit(1);
			
		});
	}
		
	});

};
