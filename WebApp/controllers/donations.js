'use strict';

var DonationsModel = require('../models/donations');


module.exports = function (router) {

    var model = new DonationsModel();

    router.get('/', function (req, res) {
        
        
        res.render('donations', model);
        
        
    });

};
