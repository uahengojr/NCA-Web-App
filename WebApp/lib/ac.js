'use strict';

var access_control = function(){
	
	return {		
		  user: { // Role name
		    can: ['account', 'event:post', 'image:post', { // list of allowed operations
		      name: 'event:delete', 
		      when: function (params, callback) {
		        setImmediate(callback, null, params.userId === params.ownerId);
		      }}, {
				  name: 'image:delete',
				  when: function(params, callback){
					setImmediate(callback, null, params.userId === params.ownerId);
			   }}
		    ]
		  },
		  board: {
		    can: ['event:save', 'event:delete', 'donation:post', 'donation:delete', 'donation:save', 'news:post', 'news:delete', 'news:save', 'view:dashboard'],
		    inherits: ['user']
		  },
		  admin: {
		    can: ['rule the server'],
		    inherits: ['board']
		  }
	}
	
};

module.exports = new access_control();
