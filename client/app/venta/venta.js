'use strict';

angular.module('tiendaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('venta', {
        url: '/venta',
        templateUrl: 'app/venta/venta.html',
        controller: 'VentaCtrl',
        controllerAs : 'vm',
        resolve : {
          personas : personas,
          inventario : inventario
        }
      });

      function inventario (base) {
        return base.productos();
      }

      function personas (base){
        return base.personas();
      }
  });
