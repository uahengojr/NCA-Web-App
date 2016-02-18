'use strict';

var PrivacyPolicyModel = require('../models/privacy-policy');


module.exports = function (router) {

    var model = new PrivacyPolicyModel();

    router.get('/', function (req, res) {
        
        
        res.render('privacy-policy', model);
        
        
    });

};
