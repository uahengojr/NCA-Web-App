'use strict';


exports.isAuthorized = function(){
	
	return function(req, res, next){
		if( req.session && req.session.user){
			User.findOne({id: req.session.passport.user.id}, function(err, user){
				if(user){
					req.user = user; 
					delete req.user.password; //delete the password from the session
					req.session.user = user; //refresh the session value
					res.locals.user = user;
				}
				//Pass request onto next route handler.
				next();
			});
		}else{
			next();
		}
	};
};

exports.injectUser = function(){
	return function(req, res, next){
		if(!req.user){
			res.redirect('/');
		}else{
			next();
		}
	};
};