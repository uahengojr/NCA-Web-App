'use strict';

var passport = require('passport');

module.exports = function (router) {

    router.get('/', function (req, res) {
		
        res.render('index');
        
    });
	
	router.post('/signup', passport.authenticate('local', {
        successRedirect : '/profile', // redirect to the secure user profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
/*	
	router.post('/signin', function(req, res, next){
		passport.authenticate('signIn', function(err, user, info){
			if(err){
				return next(err);
			}
			
			if(!user){
				console.log(info);
				return res.render('/', {message: info.signInMsg });// Back to homepage on failure.
			}
			
			req.logIn(user, function(err) {
				if(err) { 
					return next(err);
				}
				
				//return res.redirect('/users/' + user.username);
				return res.redirect('/home');
			});
		})(req, res, next);
	});
*/	
	// - Sign-in route handler for sign - //
	router.post('/signin', 
	passport.authenticate('local-sign-in'),
	function(req, res) {
		//If this function gets called, this means authentication was successful. 
		//The 'req.user' contains the autheicated user.
		//delete req.user.password; 
		delete req.user;
		//Deleted to avoid user information leak and to mantain normailized user data within application.
		
		//console.log(req.session);
		//console.log();

		res.redirect('/home'); //req.user.username;
			
	});



	
	// - Logout route from application. - //
	router.get('/logout', function(req, res){
	  //logic to clear session cookies and all info before exit.
		req.session.destroy(); //OR - delete req.session;
	  //req.logout();
	  res.redirect('/');
	});



/* THIS CAUSES PROBLEMS FOR SOME OF THE PAGES LOADING...
	// - This is a catch-all for requested pages that don't exist. - //
	router.use(function (req,res) {
    	res.render('errors/404', {url:req.url});
	});
*/	
};
	
