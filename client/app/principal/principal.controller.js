'use strict';
(function() {
  //Clase

  angular.module('tiendaApp')
    .controller('PrincipalCtrl', PrincipalCtrl)

  PrincipalCtrl.$inject = ['base', 'spersonas', 'sproductos','$mdDialog','hummer'];

  function PrincipalCtrl(base, spersonas, sproductos,$mdDialog,hummer) {
    var vm = this;

    function init() {
      vm.personas = spersonas;
      vm.productos = sproductos;
    }
    //Variables
    vm.personas = new Array;
    vm.productos = new Array;
    vm.listaDebe = new Array;
    //
    vm.idProducto = '';
    vm.idPersona = '';
    //
    vm.persona = new Object;
    vm.producto = new Object;
    //Funciones alias
    vm.listo = listo;
    vm.selectPersona = selectPersona;
    //funciones origen
    function listo(frm,ev) {

      if (frm.$valid) {
        var nombre_producto =  hummer.display(vm.productos,'id_producto',vm.idProducto,'nombre_producto');
        var params = {
          title : 'Confirmación',
          textContent : '¿Estás seguro que agarraste ' + vm.cantidad +' '+ nombre_producto +' ?'
        };
        hummer.confirm(params,ev).then(result => {
          registrar();
        });
      } else {
        var params = {
          title : 'Formulario invalido',
          textContent : 'Debes completar el formulario para continuar'
        };
        hummer.alert(params);
      }
    }
    function selectPersona() {
      //Busca el nombre segun el ID
      var nombrePresona = hummer.display(vm.personas,'id_persona',vm.idPersona,'nombre_persona');
      //Retorna la lista de productos que debe la persona
      base.debe(vm.idPersona).then(response => {
        //Se le asigna la lista
        vm.listaDebe = response;
        //TOTAL && CANTIDAD DE PRODUCTOS
        var totalValor = 0,
          totalCantidad = 0;
        for (var prod in response) {
          totalCantidad += response[prod].cant;
          totalValor += response[prod].sub_total;
        }
        //Asignación de variables al objeto
        vm.persona['nombrePersona'] = nombrePresona;
        vm.persona['totalCantidad'] = totalCantidad;
        vm.persona['totalValor'] = totalValor;

      });
      //PUSH LISTA
    }
    //FUNCIONES PRIVADAS
    function registrar(){
      //
      var arrFiar = [
        vm.cantidad,
        vm.idPersona,
        vm.idProducto
      ];
      //
      base.fiar(arrFiar).then(response => {
        selectPersona();
      });
    }

    //INICIO
    init();
  }
})();
