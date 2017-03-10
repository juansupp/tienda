'use strict';

(function(){

	angular.module('tiendaApp')

	.service('dialoger',dialoger);

	function dialoger ($mdDialog) {
		return {
			show: show 
		}

		function show (ev){

			var dialogAttrs = {
		      controller: 'DialogCtrl as vmd',
		      templateUrl: 'app/dialog/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: true
		    };

			return $mdDialog.show(dialogAttrs);
		}
		
	}

	
})();