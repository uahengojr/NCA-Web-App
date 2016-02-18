'use strict';

var SettingsModel = require('../models/settings');


module.exports = function (router) {

    var model = new SettingsModel();

    router.get('/', function (req, res) {
        
        
        res.render('settings', model);
        
        
    });

};
