'use strict';

var HelpPageModel = require('../models/help-page');


module.exports = function (router) {

    var model = new HelpPageModel();

    router.get('/', function (req, res) {
        
        
        res.render('help-page', model);
        
        
    });

};
