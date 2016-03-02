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
	
	/*-----------------------------------------------Begining of local registration strategy.------------------------------------------------*/
	
	passport.use('local', new LocalStrategy({
		
		usernameField : 'signup_email',
        passwordField : 'signup_password',
        passReqToCallback : true 
		
	},
		function(req, email, password, done){
			
			//console.log(req.body);
			
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
						var newUser = new User();
						
						newUser.email = email; //req.body.signup_email;
						newUser.password = password; //req.body.signup_password;
						newUser.name.first = req.body.signup_fullname;
						//newUser.name.last = req.body.signup_fullname;
						//newUser.date_created; //Instatiate date of creation. 
						newUser.sex = req.body.sex;
						newUser.role = 'user';
						
						//Save the newly created user.
						newUser.save(function(err){
							if(err){
								console.log("Error saving the new user: " + err);
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
	
	/*-----------------------------------------------End of local registration strategy.------------------------------------------------*/
	
	

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
				return done(null, false/*, req.flash('loginMessage','No user found.')*/);
				}
				
				//If user is found, but incorrect password. return login faile message.
				if(!user.isValidPassword(password)){
					return done(null, false/*, req.flash('loginMessage','Opps! Wrong password.')*/);
				}
				
				//If all is well, return succesful user.
				console.log('User successfully signed into application!');
				return done(null, user);
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

