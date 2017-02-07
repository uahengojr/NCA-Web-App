'use strict';

var User = require('../models/user');
var mongoose = require('mongoose');

var rbac = require('mongoose-rbac');

var permissionsLibrary = function() {
	return {
		addSuperAdmin: function(){
			console.log('One');
			
			
			rbac.init({
			  admin: [
			    ['create', 'Post'],
			    ['read', 'Post'],
			    ['update', 'Post'],
			    ['delete', 'Post']
			  ],
			  readonly: [
			    // we can also specify permissions as an object 
			    { action: 'read', subject: 'Post' }
			  ]
			}, function (err, admin, readonly) {
				console.log('Two');
				
				var superAdmin = new User({
					email: 'uahengo@me.com',
					'name.first': 'Gottlieb',
					'name.last': 'Uahengo',
					username: 'serverlord',
					sex: 'male',
					password: 'TheHouseOfCards'
				});
			
				//Save user, and Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
				superAdmin.save();			
			
				//Assign SuperAdmin Roles
				superAdmin.addRole('admin', function (err) {
					console.log("Admind role added...");
				});
 
				superAdmin.hasRole('admin', function (err, isAdmin) {
				  console.log("Here1" + isAdmin); // true 
				});
				
				
			  console.log("Here2" + admin);
			  /*
			    { __v: 1,
			      name: 'admin',
			      _id: 513c14dbc90000d10100004e,
			      permissions: [ 513c14dbc90000d101000044,
			        513c14dbc90000d101000045,
			        513c14dbc90000d101000046,
			        513c14dbc90000d101000047 ] }
			  */
			  console.log("Here3" + readonly);
			  /*
			    { __v: 1,
			      name: 'readonly',
			      _id: 513c14dbc90000d10100004f,
			      permissions: [ 513c14dbc90000d101000045 ] }
			  */
			});
			
 
		
			
		}, 
		userModel: function(){
			console.log("Threes");
			var newUser = new User({username: "john"});
			newUser.save();
			newUser.addRole('member', function (err) {
				console.log('Member created...');
			});
			return newUser;
		} //Could also add another function here...
	};
};

module.exports = permissionsLibrary;

 
