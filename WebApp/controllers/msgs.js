'use strict';

var MsgsModel = require('../models/msgs');


module.exports = function (router) {

    var model = new MsgsModel();

    router.get('/', function (req, res) {
        
        
        res.render('msgs', model);
        
        
    });

};
