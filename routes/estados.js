var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var requestSoapClient = createRequestSoapClient(router);

var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';

requestSoapClient(wsdl, function(soapClient, req, res){

  var args = {
    cidade: req.query.cidade
  };

  soapClient
    .setArgs(args)
    .setMethodToCall( function(client){
      return client.getEstados;
    })
    .execute();


} );


module.exports = router;
