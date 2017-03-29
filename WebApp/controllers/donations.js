'use strict';

var DonationsModel = require('../models/donations');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new DonationsModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('donations', model);
        
        
    });

};
