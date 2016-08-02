(function(){

	angular
		.module('sisamclient')
		.controller('indexCtrl', indexCtrl);


	indexCtrl.$inject = ['sisamservice', 'chartservice', '$scope'];
	function indexCtrl(sisamservice, chartservice, $scope){

		var vm = this;

		vm.bluevar;
		vm.redvar;

		vm.bluevarList = [];
		vm.redvarList = [];

		vm.tabulado = {
			opc_data: "ano",
			mes: [],
			ano:[ "2012-12-31",
      "2011-12-31",
      "2010-12-31",
      "2009-12-31",
      "2008-12-31",
      "2007-12-31",
      "2006-12-31",
      "2005-12-31",
      "2004-12-31"],
			data_inicial:null,
			data_final:null,
			opc_estMun:"municipio",
			estado:[],
			municipio:["5530"],
			vars:["focoq",
				"rad_uv"
			]

		};

		vm.cidadeSelecionada = function(d){
			console.log("selecionou uma cidade", d);
			vm.tabulado.municipio = [d.originalObject.gid];
			load();

		};

		
		vm.selectRedVar = function(){
			vm.tabulado.vars[1] = vm.redvar; 
			console.log(vm.tabulado.vars[1]);
			load();
		};

		vm.selectBlueVar = function(){
			vm.tabulado.vars[0] = vm.bluevar; 
			console.log(vm.tabulado.vars[0]);
			load();
		};


		function load(){
			sisamservice.getTabulado({tabulado: vm.tabulado})
			.success(function(data){
				console.log("sucesso");
				chartservice.drawChart(data.result.getDadosTabuladosReturn, vm.tabulado.vars[0], vm.tabulado.vars[1]);
			})	
			.error(function(data){
				console.log("erro");
				console.log(data);
			});

		}

		function loadVars(){
			sisamservice.getVardetails()
			.success(function(data){
				console.log("sucesso");
				vm.bluevarList = data.result.getListaVariaveisDescReturn;
				vm.redvarList = data.result.getListaVariaveisDescReturn;
			})	
			.error(function(data){
				console.log("erro");
				console.log(data);
			});
		}

		$scope.$on('$viewContentLoaded', function() {
		    load();
		    loadVars();
		});

		vm.title = "SisamClient";

	}






})();

