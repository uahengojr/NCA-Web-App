'use strict';

var GalleryModel = require('../models/gallery');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    var model = new GalleryModel();

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('gallery', model);
        
        
    });

};
