'use strict';

var passport = require('passport');
//Dynamic route should eb explored.
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
				return res.render('/', {message: info.loginMessage });// Back to homepage on failure.
			}
			
			req.logIn(user, function(err) {
				if(err) { 
					return next(err);
				}
				
				//console.log(user);
				
				if(user.role === 'admin'){
					req.session.login(function(err){
						
						if(err){
							console.error(err); //Deal with this better later
						}
						
						if(!err){
							req.session.userID = user.id;
							req.session.setRole(user.role);
							
							res.redirect('/admin/' + user.id);
						}
						
					});
					
				}
				
				/*if(user.role === 'board'){}*/
				
				if(user.role === 'user'){
					
					req.session.login(function(err){
						if(!err){
						
							//Logged in session created here.
							req.session.userID = user.id;
							req.session.setRole(user.role);
													
							res.redirect('/profile/users/' + user.id);
						}
					
					});
				}
				
			});
			
		})(req, res, next);
		
	});

	// - Logout route from application. - //
	router.get('/logout', function(req, res){
		
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
	
