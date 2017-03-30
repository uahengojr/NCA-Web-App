'use strict';

var MsgsModel = require('../models/msgs');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new MsgsModel();
	
	///Figure out how to best handle message!!!
	
    router.get('/', easySession.isLoggedIn(), function(req, res) {
        
		if(req.session.hasRole(['board', 'admin', 'user'])) {
			
			console.log(req.session.userID);
			
			req.session.can('account', function(err, has){
				if(err || !has){
					res.sendStatus(403);
				}
				
				Msgs.find({_id: req.session.userID}, function(err, msgs){
					if(err){
						console.error(err);
					}
					
					//Check if ther ar ethe owner of the messages again here???
					var model = {msgs: msgs};
					
					res.render('msgs', model);
					
				});
			});
			
		}
		
		//else redirect them to login??
        
    });

};
