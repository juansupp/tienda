'use strict';

(function() {
  angular.module('tiendaApp')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('principal', {
        url: '/',
        templateUrl: 'app/principal/principal.html',
        controller: 'PrincipalCtrl',
        controllerAs: 'vm',
        resolve: {
          spersonas : spersonas,
          sproductos : sproductos
        }
      });
  }

  function spersonas (base) {
    return base.personas();
  }

  function sproductos (base) {
    return base.productos();
  }

})();
