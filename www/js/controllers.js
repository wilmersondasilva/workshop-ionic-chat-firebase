(function() {
  angular.module('starter.controllers', ['starter.services'])

  // Cria uma diretiva para capturar o 'evento de enter' no teclado
  // Veja no input de texto do tab-chat.html
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
              scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  })

  .controller('ChatCtrl', function($scope, $ionicListDelegate, ChatService, AuthService, $ionicScrollDelegate, $timeout, $ionicLoading) {
    $scope.messages = ChatService.all();

    // Enquanto o chat está carregando
    $ionicLoading.show({
      template: 'Carregando...'
    });

    // $loaded é disparado quando o dados de $scope.messages terminam de carregar
    $scope.messages.$loaded().then(function() {
      $ionicLoading.hide();
      $ionicScrollDelegate.scrollBottom(true);
    });

    // Redimensiona o tamanho e atualiza a posição do chat
    $scope.resize = function() {
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom(true);
    }

    $scope.send = function() {
      // Captura o usuário logado
      var user = AuthService.getUser();

      ChatService.add($scope.text, user);

      $scope.text = '';
      $timeout(function() {
        $ionicScrollDelegate.scrollBottom(true);
      }, 50);
    };

    $scope.removeItem = function(message) {
      ChatService.remove(message);
      $timeout(function() {
        $ionicScrollDelegate.scrollBottom(true);
      }, 50);
      $ionicListDelegate.closeOptionButtons();
    };
  })

  .controller('AccountCtrl', function($scope, $ionicListDelegate, AuthService, $ionicPopup) {
    $scope.user = AuthService.getUser();

    function callback(error, userData) {
      if (error) {
        // Mostra um alerta em caso de erro
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Opa! Algo deu errado \n" + error,
        });
        alertPopup.then(function(res) {
          return
        });
      } else {
        console.log("login show:", userData.uid);
        // Atualiza o $scope.user
        $scope.$apply(function() {
          $scope.user = AuthService.getUser();
        });
        
      }
    }

    $scope.login = function(user) {
      AuthService.login(user.email, user.password, callback);
    };

    $scope.logout = function(user) {
      AuthService.exit();
      $scope.user = AuthService.getUser();
    };
  })

  .controller('CreateAccountCtrl', function($scope, $ionicListDelegate, AuthService, $state, $ionicPopup) {
    function callback(error, userData) {
      if (error) {
        // Mostra um alerta em caso de erro
        var alertPopup = $ionicPopup.alert({
          title: 'Error',
          template: "Opa! Algo deu errado \n" + error,
        });
      
        alertPopup.then(function(res) {
          alertPopup.close()
        });
      } else {
        // Mostra um alerta dizendo que tudo ocorreu bem
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Deu rock! Usuário criado com sucesso.',
        });
        
        alertPopup.then(function(res) {
          $state.go("tab.account")
        });
      }
    }

    $scope.createUser = function(user) {
      AuthService.createUser(user.email, user.password, callback);
    };
  });

})();
