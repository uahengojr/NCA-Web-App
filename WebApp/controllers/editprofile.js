'use strict';

var EditprofileModel = require('../models/editprofile');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new EditprofileModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('editprofile', model);
        
        
    });

};
