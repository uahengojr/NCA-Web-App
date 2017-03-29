'use strict';

var EventsModel = require('../models/events');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new EventsModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('events', model);
        
        
    });

};
