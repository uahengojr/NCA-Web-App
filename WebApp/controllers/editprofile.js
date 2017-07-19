'use strict';

var EditprofileModel = require('../models/editprofile');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    var model = new EditprofileModel();

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('editprofile', model);
        
        
    });

};
