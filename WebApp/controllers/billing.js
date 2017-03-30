'use strict';

var BillingModel = require('../models/billing');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new BillingModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
		if(req.session.hasRole(['admin', 'board', 'user'])) {
			
			User.find({_id: req.session.userID}, function(err, billing){
				
				if(err){
					return console.error(err);
				}
				/*
				var model = {
					billing: billing
				};
				
				var params = {
					visitorID: req.session.userID,
					ownerID: billing[0]._id
				};
				*/
				req.session.can('account', function(err, has){
					
					if(err || !has){
						return res.sendStatus(403);
					}
					
					return res.render('billing');
					
				});
				
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
        
    });
	
    router.get('/payment', easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['admin', 'board', 'user'])){
        	
			User.find({_id: req.session.userID}, function(err, payment){
				
				if(err){
					return console.error(err);
				}
				/*
				var model = {
					payment: payment
				};
				
				var params = {
					visitorID: req.session.userID,
					ownerID: payment[0]._id
				};
				*/
				req.session.can('account', function(err, has){
					
					if(err || !has){
						return res.sendStatus(403);
					}
					
					return res.render('payment');
					
				});
			});
			
        }else{
        	
			return res.render('errors/404', {url:req.url});
			
        }
		       
    });
	
    router.get('/editcard', easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['admin', 'board', 'user'])){
        	
			User.find({_id: req.session.userID}, function(err, cardEdit){
				if(err){
					return console.error(err);
				}
				/*
				var model = {
					cardEdit: cardEdit
				};
				
				var params = {
					visitorID: req.session.userID,
					ownerID: cardEdit[0]._id
				};
				*/
				req.session.can('account', function(err, has){
					
					if(err || !has){
						return res.sendStatus(403);
					}
					
					return res.render('editcard');
					
				});
			
			});
			
        }else{
        	
			return res.render('errors/404', {url:req.url});
			
        }
			   
    });

};
