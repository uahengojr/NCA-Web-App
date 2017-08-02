"use strict";

var BillingModel = require('../models/billing');
var easySession = require('easy-session');
var User = require('../models/user');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/:id*?', auth(), easySession.isLoggedIn(), function (req, res) {
        
		if(!req.params.id){
			User.findOne({_id: req.session.userID}, {role: 1, name: 1}, function(err, billing){
				
				if(err){
					return console.error(err);
				}
				var params = {
					userID: req.session.userID,
					ownerID: billing._id
				};
				
				if(new resourceCheck(req, params)){
					var model = {user: billing};  
					return res.render('billing', model);
					
				}
				
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}
				
			});
        }
	/*	
		if(req.session.userID === req.params.id){
			
			User.find({_id: req.params.id}, function(err, billing){
				if(err){
					return console.error(err);
				}
				
				var params = {
					userID: req.session.userID,
					ownerID: billing._id
				};
		
				if(new resourceCheck(req, params)){
					var model = {user: owner};  
					return res.render('profile', model);
					
				}
				
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}
		
				req.session.can('account', params, function(err, has){
					if(err || !has){
						return sendStatus(403);
					}
					var billing = {
						billing: billing
					};
					
					return res.render('billing', model);
				});
		
			});
		
		}
    */
    });
	
    router.get('/payment', auth(), easySession.isLoggedIn(), function (req, res) {
        
	
        
        if(req.session.hasRole(['board', 'user'])){
		
			User.findOne({_id: req.session.userID}, function(err, payment){
				
				if(err){
					return console.error(err);
				}
		
				var params = {
					userID: req.session.userID,
					ownderID: payment._id
				};
		
				if(new resourceCheck(req, params)){
					var model = {user: payment};  
					return res.render('payment', model);
					
				}
		
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}
			
			});
			
		}else{
			return res.render('errors/404', {url:req.url});
		}

		       
    });
	
    router.get('/editcard', auth(), easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['board', 'user'])){
        	
			User.findOne({_id: req.session.userID}, function(err, cardEdit){
				if(err){
					return console.error(err);
				}
				
				var params = {
					userID: req.session.userID,
					ownderID: cardEdit._id
				};
				
				if(new resourceCheck(req, params)){
					var model = {user: cardEdit};  
					return res.render('cardEdit', model);
					
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
