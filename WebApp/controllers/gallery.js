'use strict';

var Gallery = require('../models/gallery');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
        if(req.session.hasRole(['board', 'user']) && req.session.userID){
        	
			Gallery.find(function(err, images){
				if(err){
					console.error(err);  //Handle better later...
					return;
				}
				
				var model = {images: images};
				
				return res.render('gallery', model);
				
			});
			
        }else{
        	return res.render('errors/404', {url:req.url});
        }
		    
    });

};
