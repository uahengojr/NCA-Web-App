'use strict';
var easySession = require('easy-session');

var reqRoute = function() {
	
	return function(req, res, next){
				
		if(req.session.isLoggedIn()) {
			
			if(req.session.hasRole(['user', 'board','admin'])){
				console.log('User is logged in & has a defined role.');
				next();
			}else{
				//You have a different role, if you reach this...
			}
			
		}else{
			req.session.goingTo = req.url;
			req.flash('error', 'Please sign-in to view the requested page.');
			res.redirect('/signIn');
		}
	};
};

module.exports = reqRoute;




