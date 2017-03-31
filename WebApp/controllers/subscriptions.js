'use strict';

var User = require('../models/user'),
	Subscription = require('../models/subscriptions');

var easySession = require('easy-session');

module.exports = function (router) {

    router.get('/', easySession.isLoggedIn(), function (req, res) {
		
		if(req.session.hasRole(['admin', 'board', 'user'])) {
			
			User.find({_id: req.session.userID}, function(err, owner){
			
				if(err){
					return console.error(err); //Send yourself some for info about this error?
				}
			/*
				var model = {
					subscriptions: subscriptions
				};
				
				var params = {
					visitorID: req.session.userID,
					ownerID: owner[0]._id
				};
			*/		
				req.session.can('account', /*params,*/ function(err, has){
				
					if(err || !has){
						return res.sendStatus(403);
					}
					
					return res.render('subscriptions');
				
				});
			
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
        
    }).post('/:id', easySession.isLoggedIn(), function(req, res){
    	
		if(req.session.hasRole(['admin', 'board', 'user'])){
						
			Subscription.update({_id:req.params.subscripitonID}, function(err, subscription){
				
				if(err){
					return console.error(err);
				}
				
				req.session.can('account', function(err, has){
					
					if(err || !has){
						return res.sendStatus(403);
					}
					
					var newSubscriber = {
						ID: req.session.userID,
						type: req.body.type,
						amount: req.body.amount
					};
					
					subscription.new_subscription(newSubscriber); //Tally subscriber number.
					subscription.addAmount(newSubscriber[amount]); //Tally total revenue received to date.
					
					return res.send('success'/* - Some req.flash message here - */);
					
				});
				
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
		
    });

};
