'use strict'

var mongoose = require('mongoose');

var db = function(){
	return {
		config: function(conf){
			mongoose.Promise = global.Promise;
			mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
			var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'There was a connection error: Please try agian...'));
			db.once('open', function callback(){
				
				console.log('db connection is now open');
			});
		}
	};
};

module.exports = db();