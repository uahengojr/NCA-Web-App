'use strict';

var easySession = require('easy-session'),
	fs = require('fs');

//Models
var User = require('../models/user');
var Events = require('../models/events');

//var AdminModel = require('../models/admin');

module.exports = function (router) {

    //var model = new AdminModel();

    router.get('/:id*?', easySession.isLoggedIn(), easySession.checkRole('admin'), function (req, res) {
        
		if(!req.params.id){
			
			User.find({_id: req.session.userID}, function(err, admin){
				if(err){
					console.error(err); //Handle errors better later...
				}
			
				var model = {admins: admin}; 
			
				res.render('admin', model);
			
			});
			
		}else{
			
			var params = {
				adminID: req.session.userID,
				ownerId: req.params.id //Owner of the object?	
			};
			
			req.session.can('view:dashboard', params, function(err, has){
				if(err || !has){
					res.sendStatus(403);
				}
				
				User.find({_id: params.adminID}, function(err, admin){
					if(err){
						console.error(err); //Handle errors better later...
					}
			
			/*admin[0]._id*/
			
			
					var model = {admins: admin}; 
			
					res.render('admin', model);
			
				});
				
			});
			
		}

    });
	
/*	
	//Route handlers for posting/editing/delete news on the site.
	router.get('/news', function(req, res){
		res.render('news');
	}).post('post_news', function(req, res){
		res.render('news');
	}).put('edit_news', function(req, res){
		res.render('news');
	});
*/

/*
	//Route handlers for posting/editing/deleting events on the site.
	router.get('/events', easySession.isLoggedIn(), easySession.checkRole('admin'), function(req, res){
		
		Events.find({}, null, {sort : {date : 1}}, function(err, events){
			if(err){
				console.error(err);
			}
			
			var model = {events: events};
			res.render('events', model);
			
		});
		
	}).post('post_event', function(req, res){
		
		var newEvent = new Events();
		
		newEvent.eventTitle.majorTitle = req.body.majorTitle;
		newEvent.eventTitle.subTitle = req.body.subTitle;
		

//		newEvent.imgLink = "data" +  req.files.eventImg.type + ";base64" + fs.readFileSync(req.files.productImg.path).toString('base64');
//		newEvent.eventDescription = new Buffer(req.body.eventDescription, 'utf8').toString();
		
		newEvent.phoneNumber1 = req.body.phoneNum1;
		newEvent.phoneNumber2 = req.body.phoneNum2;
		newEvent.eMail1 = req.body.email1;
		newEvent.eMail2 = req.body.email2;
		newEvent.eventDate = req.body.eventDate;
		
		newEvent.location.description = req.body.eventLocationDescription;
		newEvent.location.address = req.body.eventAddress;
		newEvent.location.city = req.body.eventCity;
		//newEvent.
		
		newEvent.creator = req.session.userID;
		
		
		newEvent.save(function(err){
			if(err){
				console.error(err);
			}
			
			res.redirect('/admin/events');
			
		});
			
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
*/
	
};
