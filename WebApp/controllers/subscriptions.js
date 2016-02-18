'use strict';

var SubscriptionsModel = require('../models/subscriptions');


module.exports = function (router) {

    var model = new SubscriptionsModel();

    router.get('/', function (req, res) {
        
        
        res.render('subscriptions', model);
        
        
    });

};
