'use strict';

var EditprofileModel = require('../models/editprofile');


module.exports = function (router) {

    var model = new EditprofileModel();

    router.get('/', function (req, res) {
        
        
        res.render('editprofile', model);
        
        
    });

};
