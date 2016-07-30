var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var variaveisUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';

var requestSoapClient = createRequestSoapClient(router);

requestSoapClient(variaveisUrl, function(soapClient, req, res){

	var args = {};

	console.log("carregando variaveis novo teste");

	soapClient
		.setArgs(args)
		.setMethodToCall( function(client){
			return client.getListaVariaveis;
		})
		.execute();


} );

module.exports = router;
