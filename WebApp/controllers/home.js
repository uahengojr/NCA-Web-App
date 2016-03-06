'use strict';

var HomeModel = require('../models/home'); //Add event data via some external json url like or file. 


module.exports = function (router) {

    var model = new HomeModel();

    router.get('/', function (req, res) {
       
		res.locals.user = req.session.passport.user;

        res.render('home', model);
        
        
    });

};
