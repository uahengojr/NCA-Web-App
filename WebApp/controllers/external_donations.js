'use strict';

var ExternalDonationsModel = require('../models/external_donations');


module.exports = function (router) {

    var model = new ExternalDonationsModel();

    router.get('/', function (req, res) {
        
        
        res.render('external_donations', model);
        
        
    });

};
