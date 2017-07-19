'use strict';

var SettingsModel = require('../models/settings');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    var model = new SettingsModel();

    router.get('/', auth(),  easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('settings', model);
        
        
    });

};
