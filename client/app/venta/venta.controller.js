'use strict';
(function() {
  angular.module('tiendaApp')
    .controller('VentaCtrl', VentaCtrl);
  VentaCtrl.$inject = ['$scope', 'personas', 'inventario', 'base', 'hummer','dialoger'];

  function VentaCtrl($scope, personas, inventario, base, hummer, dialoger) {
    //SCOPE = vm
    var vm = this;
    //Function init
    function init() {
      vm.personas = personas;
      vm.inventario = inventario;
      vm.lengInventario = inventario.length;
    }
    //Variables
    vm.token = '';
    vm.idPersona = '';
    vm.personas = new Array;
    vm.inventario = new Array;
    vm.listaDebe = new Array;
    vm.ventas = new Array;
    vm.chDeuda = new Object;
    vm.persona = new Object;
    vm.fecha = new Object;
    vm.valid = false;
    vm.lengVentas = 0;
    vm.lengInventario =  0;
    vm.query = {
      limit: 5,
      page: 1
    };
    vm.queryv = {
      limit: 5,
      page: 1
    };
    //FUNCIONES ORDER
    vm.validToken = validToken;
    vm.selectPersona = selectPersona;
    vm.flush = flush;
    vm.addCant = addCant;
    vm.showDialogAddProduct = showDialogAddProduct;
    vm.showDialogAddPersona = showDialogAddPersona;
    $scope.$watch("vm.fechaDesde", fechaDesdeChange);
    $scope.$watch("vm.fechaHasta", fechaHastaChange);
    //FUNCIONES NATIVAS
    function validToken() {
      vm.valid = vm.token === 'hoa';

    }
    function selectPersona() {
      //LOAD LIST
      base.debe(vm.idPersona, true).then(response => {

        var totalValor = 0,
          totalCantidad = 0;

        for (var prod in response) {
          totalCantidad += response[prod].cant;
          totalValor += response[prod].sub_total;
        }

        vm.persona['totalCantidad'] = totalCantidad;
        vm.persona['totalValor'] = totalValor;
        vm.listaDebe = response;
      });
    }

    function flush() {
      var truess = truessFlush();
      base.flush(truess).then(response => {
        hummer.not('Registrado satisfactoriamente.');
      }).then(err=>{
        hummer.not('Registrado satisfactoriamente.');
      });
    }

    function addCant(id, ev) {

      var params = {
        title: 'Agregar cantidad',
        textContent: 'Escribe la cantidad de productos que vallas a añadir',
        placeholder: 'Cantidad'
      };

      hummer.prompt(params, ev).then(responseCantidad => {
        //Agregado
        var cantidadFinal = responseCantidad ?
                            responseCantidad.replace(/\D/g, '') : '0';
''
        if (cantidadFinal != '0') {
          base.addCant(id, cantidadFinal).then(re => {
            hummer.not('Registrado satisfactoriamente.');
            vm.inventario = re;
          });
        } else {

        }
      });
    }

    function showDialogAddProduct(ev) {
      //SHOW THE DIALOG
      dialoger.show(ev).then(response=>{
        console.log('miau');
      }).then(err=>{
        console.log('wtf');
      });
    }

    function showDialogAddPersona (ev){

      var params = {
        title : 'Agregar nueva persona',
        textContent : 'Escribe el nombre de la persona para poder registrarla ',
        placeholder : 'Nombres y apellidos'
      };

      hummer.prompt(params,ev).then(response=>{
        base.addPersona(response);
      });

    }
    function fechaDesdeChange(current, original, that) {
      vm.fechaHasta ? filterVenta() : null;
    }

    function fechaHastaChange(current, original) {
      vm.fechaDesde ? filterVenta() : null;
    }

    //FUNCIONES PRIVADAS
    function filterVenta() {
      var ini = formatFecha(vm.fechaDesde);
      var end = formatFecha(vm.fechaHasta);
      base.ventas(ini, end).then(response => {
        vm.ventas = response;
        vm.lengVentas = response.length;
      });
    }

    function formatFecha(fecha) {
      return fecha.getFullYear().toString() + "-" + (fecha.getMonth() + 1).toString() + "-" + fecha.getDate().toString()
    }

    function truessFlush() {
      var truess = [];
      for (var ch in vm.chDeuda)
        vm.chDeuda[ch] ? truess.push(ch) : null;
      return truess;
    }
    //INIT
    init();
  }

})();
