'use strict';

var express = require('express');
var flash = require('connect-flash');
var kraken = require('kraken-js');
var db = require('./lib/db');
var crypto = require('./lib/crypto');

var passport = require('passport');
var signUpStrategy= require('./lib/registration');//??
var signInStrategy = require('./lib/login');

//
var session = require('express-session');
						//--------->     //var session = require('./lib/session');
var MongoDBStore = require('connect-mongodb-session')(session);
var easySession = require('easy-session'); // Require the module : line 1
//


var rbac = {
  user: { // Role name
    can: ['account', 'post:add', { // list of allowed operations
      name: 'post:save',
      when: function (params, callback) {
        setImmediate(callback, null, params.userId === params.ownerId);
      }}
    ]
  },
  manager: {
    can: ['post:save', 'post:delete'],
    inherits: ['user']
  },
  admin: {
    can: ['rule the server', 'view:dashboard'],
    inherits: ['manager']
  }
}

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */


options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
		
		signUpStrategy(passport); //???
		signInStrategy(passport);
		
		db.config(config.get('databaseConfig'));
		var cryptConfig = config.get('bcrypt');
		crypto.setCryptoLevel(cryptConfig.difficulty);
		
        
		next(null, config);
    }
};

app = module.exports = express();
//

var store = new MongoDBStore({
	uri: 'mongodb://localhost:27017/NCA_Session_Store',
	collection: 'NCA_Sessions',
	function(err){
		console.log(err);
	}
});
/*
// Catch MONGO CONNECTION errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
});
*/
app.use(session({
    secret: 'keyboard cat',
	cookie: {
		maxAge: 1000*60*60*24*7 //1 week
	}, 
	store: store,
    resave: true,
    saveUninitialized: false
}));

//
app.use(easySession.main(session, {
	ipCheck: true, 
	uaCheck: true, 
	rbac: rbac
})); // Bind the module : line 2
//


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
