'use strict';

var User = require('../model/user');
var easySession = require('easy-session');

module.exports = function (router) {

    router.get('/', easySession.isLoggedIn(), function (req, res) {
		
		if(req.session.hasRole(['admin', 'board', 'user'])) {
			
			User.find({_id:req.session.userID}, function(err, owner){
			
				if(err){
					return console.error(err); //Send your self some for info about this error?
				}
			
				var model = {
					subscriptions: subs
				};
				
				var params = {
					visitorID: req.session.userID,
					ownerID: owner[0]._id
				};
			
				req.session.can('account', params, function(err, has){
				
					if(err || !has){
						return res.sendStatus(403);
					}
				
					res.render('subscriptions', model);
				
				});
			
			});
			
		}else{
			
			return res.render('errors/404', {url:req.url});
			
		}
        
    });

};
