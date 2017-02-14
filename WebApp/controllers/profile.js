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
					throw err;
				}
				console.log("Hello One");
				console.log(req.params.userID);
				var model = {ownr: owner}; 
				//console.log(owner);
				
				res.render('profile', model);	
				return;
			});
			
		}else{
	
		var params = {
			userId: req.session.userID,
			ownerId: req.params.id
		};
		
		req.session.can('account', params, function(err, has){
			if(err || !has){
				res.sendStarus(403);
				return;
			}
			User.find({_id: params.userId}, function(err, owner){
				if(err){
					throw err;
				}
				
				var model = {ownr: owner};  
				//console.log(owner);
				console.log("Hello Two");
				res.render('profile', model);	
				return;
			});
			
		});
	}

/*	
		var role = req.session.getRole();
		console.log("The role of the user is: " + role);
		console.log(req.session)
		console.log("============");
		console.log(req.session.isLoggedIn());
		console.log("============");
		
		res.render('profile', model);	
*/		
	});

};
