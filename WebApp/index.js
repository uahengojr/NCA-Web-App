'use strict';

var express = require('express');
var kraken = require('kraken-js');
var db = require('./lib/db');
var crypto = require('./lib/crypto');

var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var easySession = require('easy-session');

var signUpStrategy= require('./lib/registration');
var signInStrategy = require('./lib/login');
var ac = require('./lib/ac');

//Dummy data for development only -> delete before production
var testData = require('./lib/testData')();

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */


options = function spec(app){
	
	app.on('middleware:after:session', function configPassport(eventargs){
	
		app.use(easySession.main(session, {
			ipCheck: true,
			uaCheck: true,
			rbac: ac
		}));
	
		//
		signUpStrategy(passport); 
		signInStrategy(passport);
		
		//
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(flash());
		
		//
		app.use(function(req, res, next) {
		  res.locals.messages = req.flash();
		  next();
		});
	
	});
	
	return {
	    onconfig: function (config, next) {
	        /*
	         * Add any additional config setup or overrides here. `config` is an initialized
	         * `confit` (https://github.com/krakenjs/confit/) configuration object.
	         */
		
			db.config(config.get('databaseConfig'));
			var cryptConfig = config.get('bcrypt');
			crypto.setCryptoLevel(cryptConfig.difficulty);
			
			/*** Dummy Data ***/
			testData.addDonations();
			testData.addSubscriptions();
			testData.addUsers();
			/*** *** *** *** ***/
			
			next(null, config);
	    }
	};
    
};

app = module.exports = express();

app.use(kraken(options(app)));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
