'use strict';

var GalleryModel = require('../models/gallery');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new GalleryModel();

    router.get('/', easySession.isLoggedIn(), function (req, res) {
        
        
        res.render('gallery', model);
        
        
    });

};
