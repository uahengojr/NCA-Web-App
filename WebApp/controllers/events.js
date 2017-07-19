'use strict';

var EventsModel = require('../models/events');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    var model = new EventsModel();

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('events', model);
        
        
    });

};
