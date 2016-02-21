'use strict';

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	User = require('../models/user');

//Begining of local strategy.
	
exports.LocalStrategy = function(passport){
	
  // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	
	passport.use('local', new LocalStrategy({
		
		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
		
	},
		function(req, email, password, done){
			process.nextTick(function() {
				User.findOne({email: email}, function(err, user){
					//If any error occur. Return error. Hanndle this better in future!
					if(err){
						return done(err);
					}
					if(user){
						//Check to see if there is already a user with this email.
						return done(null, false, req.flash('signUpMessage','That email is already taken.'));
					}else{
						//If there's no registeres user with this email, create a user.
						new newUser = new User();
						newUser.email = req.body.signup_email;
						newUser.password = req.body.signup_password; //!!!!!!!!
						newUser.name.first = req.body.signup_fullname;
						//newUser.name.last = req.body.signup_fullname;
						//newUser.date_created; //Instatiate date of creation. 
						newuser.sex = req.body.sex;
						newUser.role = 'user';
						
						//Save the newly created user.
						newUser.save(function(err){
							if(err){
								throw err;
							}
							console.log('A new user was registered succesfully...');
							return done(null, newUser);
							
							//REDIRECT THE USER TO A PAGE TO SET UP THEIR INFORMATION.
						
						});
					}
				});
			});
		}
	));
};

//End of local strategy.