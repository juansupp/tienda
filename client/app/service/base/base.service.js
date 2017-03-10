'use strict';

(function() {
  angular.module('tiendaApp')
    .service('base', baseService);

  function baseService($http, $q) {
    //Variables globales

    //Retorno
    return {
      personas: personas,
      productos: productos,
      debe: debe,
      fiar: fiar,
      ventas: ventas,
      flush: flush,
      addCant: addCant,
      addProducto : addProducto,
      addPersona : addPersona
    };
    //PUBLICOS

    function personas() {
      var url = "select";
      var params = {
        table: "persona",
        columns: ["*"]
      };
      return rootBase(url, params);
    }

    function productos() {

      var url = "select";
      var params = {
        table: "producto",
        columns: ["*"]
      };

      return rootBase(url, params)
    }

    function debe(id, completo) {
      var url = "select";
      //
      var t = completo ? 'debe_completo' : 'debe_parcial';
      //
      var params = {
        table: t,
        columns: ["*"],
        where: " id_persona = " + id + " and pagado = 0 "
      };

      return rootBase(url, params)
    }

    function fiar(arrFiar) {
      var url = 'fiar'
        //
      var params = {
        columns: arrFiar
      };
      //
      return rootBase(url, params);
    }

    function ventas(fechaInicio, fechaFin) {
      var url = 'ventas'
        //
      var params = {
        columns: [fechaInicio, fechaFin]
      };
      return rootBase(url, params);
    }

    function flush(arrIdRegistros) {
      var promises = [];
      console.log(arrIdRegistros);
      angular.forEach(arrIdRegistros, function (value, key) {

        var url = 'flush';
        var params = {
          columns : [value]
        };
        promises.push(rootBase(url, params));

      });

      return $q.all(promises);
    }

    function addCant(id, cant) {
      var url = 'addCant'
      var params = {
        columns: {
          id: id,
          cant: cant
        }
      };
      return rootBase(url, params);
    }
    // @param newProduct = new Array;
    function addProducto(newProduct) {
      var url = 'addProducto'
      var params = {
        columns: newProduct
      }
      return rootBase(url, params);
    }

    function addPersona (nombre) {
      var url = 'addPersona';
      var  params  = {
        nombre : nombre
      }
      return rootBase(url,params);
    }
    // INTERNOS
    function rootBase(url, params) {
      //
      var def = $q.defer();
      //
      var url = "/api/bases/" + url;
      //
      $http.post(url, params).then(response => {
        def.resolve(response.data);
      });
      //
      return def.promise;
    }

  }
})();
