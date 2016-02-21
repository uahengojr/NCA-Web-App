'use strict'

/*
	A library to store crytpo specific propeties.
*/

var crypto = function(){
	
	var cryptLevel = -1;
	
	this.getCryptoLevel = function(){
		
		return cryptLevel;
		
	};
	
	this.setCryptoLevel = function(level){
		
		if(cryptLevel === -1){
			
			cryptLevel = level;
		
		}
	};
};

module.exports = new crypto();