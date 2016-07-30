var router = require('express').Router();
var controller = require('../controllers/SisamWSController');

var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

router.get('/tabulado', controller(wsdl, setMethodToCall, setArgs ) );

function setArgs(req){
	var args = {

		
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

	};
	return args;
}

function setMethodToCall(client){
	return client.getDadosTabulados;
}

module.exports = router;
