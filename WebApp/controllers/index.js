'use strict';

var passport = require('passport');
var auth = require('../lib/auth');

//Dynamic route should be explored.
module.exports = function (router) {

    router.get('/', function (req, res) {
		
        res.render('index');
        
    });
	
	router.post('/signup', passport.authenticate('local', {
        successRedirect : '/profile', // redirect to the secure user profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	router.post('/signin', function(req, res, next){
		passport.authenticate('local-sign-in', function(err, user, info){
			if(err){
				return next(err);
			}
			
			if(!user){
				console.log(info);
				return res.render('/', { message: info.loginMessage });// Back to homepage on failure.
			}
			
				//console.log(user);
				
			if(user.role === 'board' || user.role === 'user'){
				req.session.login(function(err){
					
					if(err){
						console.error(err); //Deal with this better later
					}
					
					if(!err){
					
						//Delete user some key-value pairs.
						delete user.password;
						
						//Set the session
						req.session.userID = user.id;
						req.session.setRole(user.role);
						
						req.logIn(user,function(err){
							if(err){
								return next(err);
							}
							
							res.redirect('/profile/users/' + user.id);
							
						});
					}
				
				});
				
			}else{
		 		//What now??
			 		//We really don't know you, dude...
				return res.redirect('/');
			}
			
			if(user.role === 'admin'){
				req.session.login(function(err){
					
					if(err){
						console.error(err); //Deal with this better later
					}
					
					if(!err){
						
						//Delete user some key-value pairs.
						delete user.password;
						
						//Set the session
						req.session.userID = user.id;
						req.session.setRole(user.role);
						
						req.logIn(user, function(err) {
							if(err) { 
								return next(err);
							}
							
							res.redirect('/admin/' + user.id);
							
						});
						
					}
					
				});
				
			}else{
		 		//What now??
			 		//We really don't know you, dude...
				return res.redirect('/');
			}
			
		})(req, res, next);
		
	});

	// - Logout route from application. - //
	router.get('/logout', auth(), function(req, res){
		
		req.session.logout(function(err) {
  		  	if(!err){
  		  		//Here we have logged-out the session
				console.log('Session deleted...');
			    res.redirect('/');
  		  	} //Should possible include an error handler here.
		});
	
	});



/* THIS CAUSES PROBLEMS FOR SOME OF THE PAGES LOADING...
	// - This is a catch-all for requested pages that don't exist. - //
	router.use(function (req, res) {
    	res.render('errors/404', {url:req.url});
	});
*/	
};
	
