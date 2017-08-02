"use strict";

var Home = require('../models/home'); //Add event data via some external json url like or file. 
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
		
		if(req.session.hasRole(['board', 'user']) && req.session.userID){
	  		Home.find(function(err, details){
	  			if(err){ 
					console.error(err); 
					return;
				}
			
				var model = {details: details};
			
				res.render('home', model);
			
	  		});
		
    	}else{
			
    		return res.render('errors/404', {url:req.url});
			
   	 	}
        
    });

};
