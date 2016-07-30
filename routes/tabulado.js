var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var requestSoapClient = createRequestSoapClient(router);

var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

requestSoapClient(wsdl, function(soapClient, req, res){

	//Não está funcionando
	var args = {

		
		opc_data:'ano',
		mes:null,
		ano:[
			"2012-12-31",
		      "2011-12-31",
		      "2010-12-31",
		      "2009-12-31",
		      "2008-12-31",
		      "2007-12-31",
		      "2006-12-31",
		      "2005-12-31",
		      "2004-12-31"
		],
		data_inicial:null,
		data_final:null,

		opc_estMun:'estado',
		estado:[
		"Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "Distrito Federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Paraná",
        "Paraíba",
        "Pará",
        "Pernambuco",
        "Piauí",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rio de Janeiro",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
     	"Tocantins"

		],
		municipio:null,

		vars:[
		"Profundidade Optica de Aerossóis",
        "Incerteza da Profundidade Optica de Aerossóis",
        "Concentração de Poluentes CO Max.",
        "Concentração de Poluentes CO Med.",
        "Concentração de Poluentes CO Min.",
        "Concentração de Poluentes PM 2,5 Max.",
        "Concentração de Poluentes PM 2,5 Med.",
        "Concentração de Poluentes PM 2,5 Min.",
        "Descargas Elétricas",
        "Focos de Queima",
        "Possibilidade de Geada",
        "Anomalia de Temperatura do Ar Máxima",
        "Anomalia de Temperatura do Ar Média",
        "Anomalia de Temperatura do Ar Mínima",
        "Precipitação Acumulada",
        "Radiação UV Max.",
        "Ocorrência de Tempestades",
        "Temperatura do Ar Max.",
        "Temperatura do Ar Med.",
        "Temperatura do Ar Min.",
        "Umidade Relativa do Ar Max.",
        "Umidade Relativa do Ar Med.",
        "Umidade Relativa do Ar Min.",
        "Vento Próximo a Superfície - Direção",
        "Vento Próximo a Superfície - Velocidade"

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