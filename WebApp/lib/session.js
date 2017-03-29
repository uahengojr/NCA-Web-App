'use strict';

var session = require('express-session'),
	MongoDBStore = require('connect-mongodb-session')(session);
	
	/** Creates a MongoDBD-backed session store.
	*
	* @param {Object} [sessionConfig] Configuration options for express-session
	* @param {Object} [mongodbConfig] Configuration options for connect-mongodb-session
	* @returns {Object} Returns a session middleware which is backed by MongoDB
	*/
module.exports = function (sessionConfig, mongodbConfig) {

	 // add the 'store' property to our session configuration
	 sessionConfig.store = new MongoDBStore({
		 uri: 'mongodb://' + mongodbConfig.host + '/' + mongodbConfig.db,
		 collection: mongodbConfig.collection
	 });

	 // create the actual middleware
	 return session(sessionConfig);
	
};
