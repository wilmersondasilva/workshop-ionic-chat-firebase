// 'starter' é o nome do módulo que setamos no ng-app no <body> do index.html
// O segundo parâmetro é um array de dependências
// 'starter.services' está em services.js
// 'starter.controllers' está em controllers.js
(function() {
	angular.module('starter', ['ionic', 'starter.controllers'])

	.run(function($ionicPlatform, $timeout, $ionicScrollDelegate) {
	  $ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }

	    // quando o teclado no aparelho for ativado, atualizamos a posição da última
	    // mensagem no chat ('delegate-chat' está setado no ion-content em tab-chat.html)
	  	window.addEventListener('native.keyboardshow', function(e){
    		$ionicScrollDelegate.$getByHandle('delegate-chat').scrollBottom();
			});

	  	// quando o teclado no aparelho for desativado, atualizamos novamente 
	  	// a posição da última mensagem no chat
			window.addEventListener('native.keyboardhide', function(e){
    		$ionicScrollDelegate.$getByHandle('delegate-chat').scrollBottom();
			});

	  });

	})

	.config(function($stateProvider, $urlRouterProvider) {
		
		// Ionic usa o AngualarUI Router que usa o conceito de states (estados)
	  // Os controller's de todos os states estão em  controllers.js
	  $stateProvider

	  .state('tab', {
	    url: "/tab",
	    abstract: true,
	    templateUrl: "templates/tabs.html",
	  })

	  // Cada tab tem o seu próprio history navigation (histórico de navegação)
	  .state('tab.chat', {
	    url: '/chat',
	    views: {
	      'tab-chat': {
	        templateUrl: 'templates/tab-chat.html',
	        controller: 'ChatCtrl'
	      }
	    }
	  })

	  .state('tab.account', {
	    url: '/account',
	    views: {
	      'tab-account': {
	        templateUrl: 'templates/tab-account.html',
	        controller: 'AccountCtrl'
	      }
	    }
	  })

	  .state('tab.createAccount', {
	    url: '/create-account',
	    views: {
	      'tab-account': {
	        templateUrl: 'templates/tab-create-account.html',
	        controller: 'CreateAccountCtrl'
	      }
	    }
	  })

	  // se a url chamada não combinar com nenhum state, esse é o padrão
	  $urlRouterProvider.otherwise('/tab/chat');
	});

})();
