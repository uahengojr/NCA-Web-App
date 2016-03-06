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
	router.post('/signin', passport.authenticate('local-sign-in', {
        successRedirect : '/home', // redirect to the secure home section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
*/	
	// - Sign-in route handler for sign - //
	router.post('/signin', 
	passport.authenticate('local-sign-in'),
	function(req, res) {
		//If this function gets called, this means authentication was successful. 
		//The 'req.user' contains the autheicated user.
		
		console.log(req.session);
		console.log();
		console.log("This is the user below:");
		console.log(req.user);
		console.log();
		
		// - The session object contains the user db id - //
		req.session.passport.user;
		req.user.passport.destroy();
//		res.locals.user = req.user;

		res.redirect('/home'); //req.user.username;
	
	});
	
	// - Logout route from application. - //
/*	router.get('/logout', function(req, res){
	  //logic to clear session cookies and all info before exit.
	  req.session.destroy();
	  req.logout();
	  res.redirect('/');
	});
*/
	// - This is a catch-all for requested pages that don't exist. - //
	router.use(function (req,res) {
    	res.render('errors/404', {url:req.url});
	});
	
};