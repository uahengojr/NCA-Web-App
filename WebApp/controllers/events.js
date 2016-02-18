'use strict';

var EventsModel = require('../models/events');


module.exports = function (router) {

    var model = new EventsModel();

    router.get('/', function (req, res) {
        
        
        res.render('events', model);
        
        
    });

};
