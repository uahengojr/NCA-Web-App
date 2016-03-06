'use strict';

var HomeModel = require('../models/home');


module.exports = function (router) {

    var model = new HomeModel();

    router.get('/', function (req, res) {
        //console.log(req.session);
        //console.log();
		//console.log(req.user);
		//res.locals.user = req.user;
        res.render('home', model);
        
        
    });

};
