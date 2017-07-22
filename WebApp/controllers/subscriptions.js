'use strict';

var User = require('../models/user'),
	Subscription = require('../models/subscriptions');

var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
		
		if(req.session.hasRole(['board', 'user'])) {
			
			User.find({_id: req.session.userID}, function(err, subscrip){
			
				if(err){
					return console.error(err); //Send yourself some for info about this error?
				}
				
				var params = {
					userID: req.session.userID,
					ownerID: subscrip.id
				};				
		
				if(new resourceCheck(req, params)){
			
					var model = {user: subscrip};
					
					res.render('subscriptions', model);
			
				}
		
				if(!(new resourceCheck(req, params))){
					return res.sendStatus(403);
				}
				
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
        
    }).post('/:id', auth(), easySession.isLoggedIn(), function(req, res){
    	
		if(req.session.hasRole(['board', 'user'])){
						
			Subscription.update({_id:req.params.subscripitonID}, function(err, subscription){
				
				if(err){
					return console.error(err);
				}
				
				req.session.can('account', function(err, has){
					
					if(err){
						//erro occured. Handle it...
						return res.sendStatus(403);
					}
					
					if(!has){
						//Not allowed
						return res.sendStatus(403);
					}
					
					var newSubscriber = {
						ID: req.session.userID,
						type: req.body.type,
						amount: req.body.amount
					};
					
					subscription.new_subscription(newSubscriber); //Tally subscriber number.
					subscription.addAmount(newSubscriber[amount]); //Tally total revenue received to date.
					
					//Send the user an email.
					return res.send('success', req.flash('success', 'You have succeffuly subscribed. Check you emial for confirmation.');
					
				});
				
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
		
    });

};
