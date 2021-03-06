"use strict";

var User = require('../models/user');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');
var resourceCheck = require('../lib/resourceCheck');


module.exports = function (router) {
	
	///Figure out how to best handle message!!!
    router.get('/', auth(), easySession.isLoggedIn(), function(req, res) {
        
		if(req.session.hasRole(['board', 'user']) && req.session.userID){
			
			User.find({_id: req.session.userID}, function(err, msgs){
				if(err){
					console.error(err);
					return;
				}
				
				var params = {
					userID: req.session.userID,
					ownerID: msgs.id
				};				
			
				if(new resourceCheck(req, params)){
				
					var model = {msgs: msgs};
					res.render('msgs', model);
				
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
