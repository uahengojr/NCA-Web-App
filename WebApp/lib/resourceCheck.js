'use strict';

var easySession = require('easy-session');

module.exports = function(req, params){
		
	req.session.can('account', params, function(err, has){
		
		if(err){
			console.error(err);	//handle & log the error better, for latter analysis...
			return false;
		}
				
		if(!has){
			return false;
		}else{
			return true;
		}
				
	});
	 
	
};

