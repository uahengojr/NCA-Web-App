'use strict';

var ProfileModel = require('../models/profile');

var User = require('../models/user');
var easySession = require('easy-session');


module.exports = function (router) {

    var model = new ProfileModel();

    router.get('/', function (req, res) {
        
        res.render('profile', model);
        
        
    });


	router.get('/users/', easySession.isLoggedIn(), function(req, res){
	
		var role = req.session.getRole();
		console.log("The role of the user is: " + role);
		console.log(req.session)
		console.log("============");
		console.log(req.session.isLoggedIn());
		console.log("============");
		
		res.render('profile', model);	
		
	});

};
