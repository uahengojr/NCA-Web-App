'use strict';

var Event = require('../models/events');
var easySession = require('easy-session');

//Middleware
var auth = require('../lib/auth');

module.exports = function (router) {

    router.get('/', auth(), easySession.isLoggedIn(), function (req, res) {
        
		if(req.session.hasRole(['board', 'user'])){
			
			Event.find({}, {sort: {eventDate: -1} }, function(err, events){
				
				if(err){
					return console.error(err);
				}
				
				var model = {events: events};
				
				res.render('events', model);
				
			});
			
		}else{
			
			
			return res.render('errors/404', {url:req.url});
			
		}
        
    }).get('/:id', auth(), easySession.isLoggedIn(), function(req, res){
		
		if(req.session.hasRole(['board', 'user'])){
			
			Event.findOne(function(err, event){
				
				if(err){
					return console.error(err);
				}
				
				var model = {event: event};
				
				res.render('event', model);
				
			});
			
		}else{
			
			
			return res.render('errors/404', {url:req.url});
			
		}
		
    }).post('/', auth(), easySession.isLoggedIn(), function(req, res){
		
    	if(req.session.hasRole(['board', 'user'])){
			
    		Event.insertOne(function(err, result){
    			if(err){ 
					return console.error(err);
				}
				var newEvent = new Event();
				
				//Blah Blah Blah...
				/**	newEvent.
					newEvent.
					newEvent.
					newEvent.
					newEvent.
					newEvent.
					newEvent.
					newEvent.
				**/
				newEvent.save(function(err, event){
					if(err){
						return console.error(err);
					}
					
					return res.redirect('events/:' + event.id, req.flash('success','Welcome to NCA the community!'));
					
				});
    		});
			
    	}else{
			
			return res.render('errors/404', {url:req.url});
			
    	}
		
    }).put().delete();

};
