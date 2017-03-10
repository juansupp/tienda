'use strict';

(function(){

angular.module('tiendaApp')

	.controller('DialogCtrl',DialogCtrl);

	DialogCtrl.$inject  = ['base','$mdDialog','hummer'];

	function DialogCtrl (base,$mdDialog,hummer) {
		var vmd = this;
		//FUNCIONES 
		vmd.aceptar = aceptar;
		vmd.cancelar = cancelar;

		function aceptar (frm){
			var newProducto = {
				nombre_producto  : vmd.nombreProducto,
				precio_producto :  vmd.precioProducto,
				cantidad_producto : vmd.cantidadProducto
			} 
			base.addProducto(newProducto)
			.then(response=>{
				hummer.not('Registrado satisfactroriamente.');
				$mdDialog.hide();
			});
		}

		function cancelar () {
			$mdDialog.cancel();
		}
	}
})();