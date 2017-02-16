'use strict';

var AdminModel = require('../models/admin');

var User = require('../models/user');
var easySession = require('easy-session');

module.exports = function (router) {

    var model = new AdminModel();

    router.get('/:id*?', easySession.isLoggedIn(), easySession.checkRole('admin'), function (req, res) {
        
		if(!req.params.id){
			
			User.find({_id: req.session.userID}, function(err, admin){
				if(err){
					console.error(err); //Handle better later...
				}
			
				var model = {admins: admin}; 
			
				res.render('admin', model);
				return;
			
			});
			
		}else{
			
			var params = {
				adminID: req.session.userID,
				ownerId: req.params.id //Owner of the object?	
			};
			
			req.session.can('view:dashboard', params, function(err, has){
				if(err || !has){
					res.sendStatus(403);
					return;
				}
				
				User.find({_id: params.adminID}, function(err, admin){
					if(err){
						console.error(err); //Handle better later...
					}
			
			/*admin[0]._id*/
			
			
			
					var model = {admins: admin}; 
			
					res.render('admin', model);
					return;
			
				});
				
			});
			
		}

    });
	
	
	//Route handlers for posting/editing/delete news on the site.
	router.get('/news', function(req, res){
		res.render('news');
	}).post('post_news', function(req, res){
		res.render('news');
	}).put('edit_news', function(req, res){
		res.render('news');
	});
	
	//Route handlers for posting/editing/deleting events on the site.
	router.get('/events', function(req, res){
		res.render('events');
	}).post('post_event', function(req, res){
		res.render('event');
	}).put('edit_event', function(req, res){
		res.render('event');
	}).delete('delete_event', function(req, res){
		res.render('events');
	});
	
	//Route handlers for posting/editing/deleting donations on the site.
	router.get('/donations', function(req, res){
		res.render('donations');
	}).post('post_donation', function(req, res){
		res.render('donations');
	}).put('edit_donation', function(req, res){
		res.render('donation');
	}).delete('delete_donations', function(req, res){
		res.render('donation');
	});

};
