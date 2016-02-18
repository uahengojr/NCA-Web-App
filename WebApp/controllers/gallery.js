'use strict';

var GalleryModel = require('../models/gallery');


module.exports = function (router) {

    var model = new GalleryModel();

    router.get('/', function (req, res) {
        
        
        res.render('gallery', model);
        
        
    });

};
