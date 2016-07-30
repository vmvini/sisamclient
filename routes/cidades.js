var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');

var cidadesUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';

var requestSoapClient = createRequestSoapClient(router);


requestSoapClient(cidadesUrl, function(soapClient, req, res){

  var args = {
    cidade: req.query.cidade
  };

  soapClient
    .setArgs(args)
    .setMethodToCall( function(client){
      return client.getMunicipios;
    })
    .execute();


} );


module.exports = router;
