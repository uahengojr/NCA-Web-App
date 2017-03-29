'use strict';

var HomeModel = require('../models/home'); //Add event data via some external json url like or file. 

var easySession = require('easy-session');

module.exports = function (router) {

    var model = new HomeModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
	  	
		console.log(req.session.id);
				
        res.render('home' , model);
        
    });

};
