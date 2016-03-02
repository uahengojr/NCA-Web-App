'use strict';

var LocalStrategy = require('passport-local').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	User = require('../models/user');

module.exports = function(passport){
    /* - Passport session setup - */
	/* - Required for persistent login sessions & passport needs ability to serialize and unserialize users out of session. - */
	
    // This is used to serialize the user for the session.
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // This is used to deserialize the user.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	
	/*-----------------------------------------------Begining of local sign-in strategy.------------------------------------------------*/
	passport.use('local-sign-in', new LocalStrategy({
		
		usernameField : 'signin_email',
        passwordField : 'signin_password',
        passReqToCallback : true 
		
		},function(req, email, password, done){
		User.findOne({'email': email /*|| username: email || phone_number: email*/}, function(err, user){
				//If any errors, return the error prior to anything else.
				if(err){
					return done(err);
				}
				
				//If no user is found, return login failed message.
				if(!user){
					return done(null, false, req.flash('loginMessage','No user found.'));
				}
				
				//If user is found, but incorrect password. return login faile message.
				if(!user.isValidPassword(password)){
					return done(null, false, req.flash('loginMessage','Opps! Wrong password.'));
				}
				
				//If all is well, return succesful user.
				return done(null, user);
				
				/*
				user.aSyncIsValidPassword(password, function(err, bool){
					if(err){throw err;}
					
					if(bool){
						console.log("Async baby....");
						return done(null, user);
					}else{
						return done(null, false, req.flash('loginMessage','Opps! Wrong password.'));
					}
				});
				*/
			});
		}
	));
	/*-----------------------------------------------End of local sign-in strategy.------------------------------------------------*/
	
	
	
	/*-----------------------------------------------Begining of Facebook registration strategy.------------------------------------------------*/
	/*
	passport.use('facebook', new FacebookStrategy({
		}, fucntion(){}
	));
	*/
	/*-----------------------------------------------End of Facebook registration strategy.------------------------------------------------*/
	
};
