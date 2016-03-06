'use strict';


exports.isAuthorized = function(){
	
	return function(req, res, next){
		//Site access map.
		
		if(){}
		else if(){}
		else if(){}
		else{
			next();
		}
	};
};

exports.injectUser = function(){
	return function(req, res, next){
		if(!req.session.passport){ //Should call middleware above
			res.redirect('/');
		}else{
			res.locals.user = req.session.passport.user;
			next();
		}
	};
};