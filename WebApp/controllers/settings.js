'use strict';

var SettingsModel = require('../models/settings');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new SettingsModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('settings', model);
        
        
    });

};
