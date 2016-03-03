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
	
	router.post('/signin', passport.authenticate('local-sign-in', {
        successRedirect : '/home', // redirect to the secure home section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	// - Logout route from application. - //
	
	router.get('/logout', function(req, res){
	  //logic to clear session cookies and all info before exit.
	//req.session = delete??? - Something about deleting the user session prior to logging out. 
	  req.logout();
	  res.redirect('/');
	});

	

	// - This is a catch-all for requeste dpages taht don't exist. - //
	
	router.use(function (req,res) {
    	res.render('errors/404', {url:req.url});
	});
	
};