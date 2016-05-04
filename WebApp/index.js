'use strict';

var express = require('express');
var flash = require('connect-flash');
var kraken = require('kraken-js');
var db = require('./lib/db');
var crypto = require('./lib/crypto');

var passport = require('passport');

var signUpStrategy= require('./lib/registration');//??
var signInStrategy = require('./lib/login');

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
		db.config(config.get('databaseConfig'));
		
		signUpStrategy(passport); //???
		signInStrategy(passport);
		
		var cryptConfig = config.get('bcrypt');
		crypto.setCryptoLevel(cryptConfig.difficulty);
		//userLib.addUsers();
        
		next(null, config);
    }
};

app = module.exports = express();
//
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
