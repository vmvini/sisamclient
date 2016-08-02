(function(){

	angular
		.module('sisamclient')
		.controller('indexCtrl', indexCtrl);


	indexCtrl.$inject = ['sisamservice', 'chartservice'];
	function indexCtrl(sisamservice, chartservice){

		var vm = this;

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
			municipio:["3976"],
			vars:["focoq",
				"rad_uv"
			]

		};

		sisamservice.getTabulado({tabulado: vm.tabulado})
			.success(function(data){
				console.log("sucesso");
				chartservice.drawChart(data.result.getDadosTabuladosReturn, vm.tabulado.vars[0], vm.tabulado.vars[1]);
			})	
			.error(function(data){
				console.log("erro");
				console.log(data);
			});

		/*sisamservice.getAnos()
			.success(function(data){
				console.log("sucesso ao pegar anos");
				vm.tabulado.ano = data.result.getAnosReturn;
			})
			.error(function(data){
				console.log("erro ao pegar anos");
				console.log(data);
			});*/



		vm.title = "SisamClient";

	}






})();

/*var args = {

		
		opc_data:'ano',
		mes:null,
		ano:[
			"2012-12-31"
		],
		//data_inicial:"2012-12-31",
		//data_final:new Date(),

		opc_estMun:'municipio',
		estado:[
		"SP"

		],
		municipio:[
			"3976" //gid
		],

		vars:[
		"geada"


		]

	};*/