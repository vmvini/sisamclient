var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var requestSoapClient = createRequestSoapClient(router);

var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

requestSoapClient(wsdl, function(soapClient, req, res){

	var args = {

		opc_data: 'mes',
		mes: '',
		opc_estMun: 'municipio',
		municipio:'',
		vars:''

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