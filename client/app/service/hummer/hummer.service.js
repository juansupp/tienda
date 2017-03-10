'use strict';
(function() {

  angular.module('tiendaApp')
    .service('hummer', hummer);

  function hummer($mdDialog,$mdToast) {

    return {
      confirm: confirm,
      alert: alert,
      display: display,
      prompt: prompt,
      not : not
    };
    //

    function not(text) {

      var noti =  $mdToast.simple()
      .textContent(text)
      .position('left')
      .hideDelay(5000); 

      return $mdToast.show(noti);
    }

    //
    function alert(param, ev) {
      console.log('shit');
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#body')))
        .clickOutsideToClose(true)
        .title(param.title)
        .textContent(param.textContent)
        .ariaLabel('Alert Dialog Demo')
        .ok('Ok')
        .targetEvent(ev)

    }
    //
    function prompt(param, ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title(param.title)
        .textContent(param.textContent)
        .placeholder(param.placeholder)
        .ariaLabel(param.placeholder)
        .targetEvent(ev)
        .ok('Aceptar')
        .cancel('Cancelar');
      return $mdDialog.show(confirm);
    }
    //
    function confirm(param, ev) {
      var confirm = $mdDialog.confirm()
        .title(param.title)
        .textContent(param.textContent)
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('SI')
        .cancel('Cancelar');

      return $mdDialog.show(confirm);
    }
    //
    function display(lista, idNombre, idSearch, displayNombre) {
      //
      var finder = null;
      //
      lista.filter(elemento => {
        if (finder === null)
          finder = elemento[idNombre] == idSearch ? elemento[displayNombre] : null;
      });
      //
      return finder;
    }
  }

})();
