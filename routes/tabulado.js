var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var requestSoapClient = createRequestSoapClient(router);

var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

requestSoapClient(wsdl, function(soapClient, req, res){

	//Está funcionando!
	var args = {

		
		opc_data:'ano',
		mes:null,
		ano:[
			"2012-12-31"
		],
		data_inicial:null,
		data_final:null,

		opc_estMun:'estado',
		estado:[
		"SP"

		],
		municipio:null,

		vars:[
		"conc_co_max"

		]

	};

	console.log("carregando variaveis novo teste");

	soapClient
		.setArgs(args)
		.setMethodToCall( function(client){
			return client.getDadosTabulados;
		})
		.execute();


} );


module.exports = router;