'use strict';

var session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session);

module.exports = function(sessionConfig, dbConfig){
	
		var store = new MongoDBStore({
        	uri: 'mongodb://' + dbConfig.host + '/' + dbConfig.database,
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
