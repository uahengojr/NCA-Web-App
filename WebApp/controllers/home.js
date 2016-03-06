'use strict';

var HomeModel = require('../models/home'); //Add event data via some external json url like or file. 

var auth = require('../lib/authorization');

module.exports = function (router) {

    var model = new HomeModel();

    router.get('/', auth.injectUser(), function (req, res) {
       
		console.log(req.session);
	   
        res.render('home', model);
        
        
    });

};
