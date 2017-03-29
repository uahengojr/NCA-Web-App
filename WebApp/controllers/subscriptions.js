'use strict';

var SubscriptionsModel = require('../models/subscriptions');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new SubscriptionsModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
		
        res.render('subscriptions', model);
        
        
    });

};
