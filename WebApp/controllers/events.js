'use strict';

var easySession = require('easy-session');
var events = require('../models/events');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('events', model);
        
        
    });

};
