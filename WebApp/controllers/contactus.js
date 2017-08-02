"use strict";
var easySession = require('easy-session');

module.exports = function (router) {

  
    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('contactus');
        
        
    });

};
