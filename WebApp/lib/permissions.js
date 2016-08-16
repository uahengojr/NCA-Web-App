'use strict';

var rbac = require('mongoose-rbac');
var Permission = rbac.Permission;
var Role = rbac.Role;

var permissions = [
	//Post News
	{subject:"News", action:"create"},
	{subject:"News", action:"read"},
	{subject:"News", action:"update"},
	{subject:"News", action:"delete"},
	
	//Post Events
	{subject:"Event", action:"create"},
	{subject:"Event", action:"read"},
	{subject:"Event", action:"update"},
	{subject:"Event", action:"delete"},
	
	//Post Photos
	{subject:"Photo", action:"create"},
	{subject:"Photo", action:"read"},
	{subject:"Photo", action:"update"},
	{subject:"Photo", action:"delete"},
	
	//Post Photos
	{subject:"Msg", action:"create"},
	{subject:"Msg", action:"read"},
	{subject:"Msg", action:"delete"}
	
];

Permission.create(permissions, function(err){
	var perms, admin, board, member;
	
	perms = Array.prototype.slice.call(arguments, 1);
	
	admin = new Role({name: 'admin'});
	admin.permissions = perms;
	admin.save(function(err, admin){
		board = new Role({name: 'board'});
		board.permissions = perms;
		board.save(function(err, board){
			member = new Role({name: 'member'});
			member.permissions = perms.slice(4, 14);
			member.save(function(err){
				//Whatever you'd like here...
			})
		});
	});
});

