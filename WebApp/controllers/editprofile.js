"use strict";

var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
		
		if(req.session.hasRole(['board', 'user']) && req.session.userID) {
			//Use session varibale instead of get variable
			User.findOne({_id: req.session.userID}, {role: 1, name: 1}, function(err, profile){
				
				if(err){
					console.error(err);
					throw err; //Handle better later...
				}
				var params = {
					userID: req.session.userID,
					ownerID: profile.id
				};				
				
				if(new resourceCheck(req, params)){
					var model = {user: profile};  
					return res.render('editprofile', model);
					
				}
				
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}

			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
		
           
    });
	
	

};
