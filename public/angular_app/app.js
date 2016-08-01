(function(){

	angular.module('sisamclient', ['ngRoute'])
		.config(['$routeProvider', config]);


	function config($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl:'angular_app/views/index.html',
				controller:'indexCtrl',
				controllerAs:'vm'
			})
			.otherwise({redirectTo:'/'});
	}

})();