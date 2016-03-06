'use strict';


exports.isAuthorized = function(){
	
	return function(req, res, next){
		if( req.session && req.session.passport.user){
			User.findOne({id: req.session.passport.user.id}, function(err, user){
				if(user){
					req.user = user; 
					delete req.user.password; //delete the password from the session
					req.session.user = user; //refresh the session value
					res.locals.user = user;
				}
				//Pass request onto next route handler.
				console.log('1. Hello World!');
				next();
			});
		}else{
			console.log('2. Hello World!');
			next();
		}
	};
};

exports.injectUser = function(){
	return function(req, res, next){
		if(!req.session.passport){ //Should call middle ware above
			res.redirect('/');
		}else{
			
			res.locals.user = req.session.passport.user;

			next();
		}
	};
};