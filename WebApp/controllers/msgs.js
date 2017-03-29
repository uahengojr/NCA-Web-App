'use strict';

var MsgsModel = require('../models/msgs');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new MsgsModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
		
        res.render('msgs', model);
        
        
    });

};
