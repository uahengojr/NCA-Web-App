'use strict';

var BillingModel = require('../models/billing');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new BillingModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('billing', model);
        
        
    });
	
    router.get('/payment', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('payment');
        
        
    });
	
    router.get('/editcard', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('editcard');
        
        
    });

};
