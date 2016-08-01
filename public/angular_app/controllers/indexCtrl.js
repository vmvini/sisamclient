(function(){

	angular
		.module('sisamclient')
		.controller('indexCtrl', indexCtrl);


	//indexCtrl.$inject = [''];
	function indexCtrl(){

		var vm = this;

		vm.title = "SisamClient";

	}

})();