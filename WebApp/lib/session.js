'use strict';

var session = require('express-session'),
	mongoStore = require('connect-mongodb-session');

module.exports = function(sessionConfig, dbConfig){

		var store = new mongoStore({
        	uri: 'mongodb://' + dbConfig.host + '/' + dbConfig.db,
        	collection: 'mySessions'
		});
    	
		// Catch errors
    	store.on('error', function(error) {
			//Perhaps look into placing an error log...
      	  	assert.ifError(error);
      		assert.ok(false);
    	});
		
		sessionConfig.store;
		
		return session(sessionConfig);
};
