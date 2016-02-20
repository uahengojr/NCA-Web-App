'use strict';

var BillingModel = require('../models/billing');


module.exports = function (router) {

    var model = new BillingModel();

    router.get('/', function (req, res) {
        
        
        res.render('billing', model);
        
        
    });
	
    router.get('/payment', function (req, res) {
        
        
        res.render('payment');
        
        
    });
	
    router.get('/editcard', function (req, res) {
        
        
        res.render('editcard');
        
        
    });

};
