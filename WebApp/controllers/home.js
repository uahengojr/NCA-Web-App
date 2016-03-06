'use strict';

var HomeModel = require('../models/home'); //Add event data via some external json url like or file. 


module.exports = function (router) {

    var model = new HomeModel();

    router.get('/', function (req, res) {
        console.log(req.session);
        console.log();
		console.log(req.user);
        console.log();
		
		//res.locals.user = req.user;
		var user = {user: req.session.passport.user};
		
        res.render('home', user);
        
        
    });

};
