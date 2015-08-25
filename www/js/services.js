(function() {
  angular.module('starter.services', ['firebase'])

	.factory('ChatService', function($firebaseArray) {
		var messages = new Firebase('https://workshop-ionic.firebaseio.com/messages');
		var chat = $firebaseArray(messages);

		return {
	    all: function() {
	      return chat;
	    },
	    add: function(message, user) {
	    	// Verifica se existe usuário logado
	    	if(user) {
	    		var user = user.password.email
	    	} else {
	    		var user = 'anônimo'
	    	};
	        chat.$add({
		        'text': message,
		        'user': user
		    	});
	    },
	    remove: function(message) {
	      chat.$remove(message);
	    },
	    get: function(id) {
				return new Firebase('https://workshop-ionic.firebaseio.com/messages/' + id);
	    }
		};
  })

  .factory("AuthService", function($firebaseAuth) {
		var auth = new Firebase("https://workshop-ionic.firebaseio.com");

		return {
	    createUser: function(email, password, callback) {
	      auth.createUser({
			  	email: email,
			  	password: password
				}, callback);
	    },
	    login: function(email, password, callback) {
	      auth.authWithPassword({
				  email: email,
				  password: password,
				}, callback);
	    },
	    getUser: function() {
	    	return auth.getAuth();
	    },
	    exit: function() {
	    	return auth.unauth();
	    },
	    changePassword: function(email, oldpassword, newpassword) {
	      auth.changePassword({
				  email: email,
				  oldpassword: oldpassword,
				  newpassword: newpassword,
					}, function(error, userData) {
					  if (error) {
					    console.log("Error change password:", error);
					  } else {
					    console.log("Password changed!");
					 	}
				});
    	},
		};
	});
})();