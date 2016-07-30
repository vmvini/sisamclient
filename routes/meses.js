var express = require('express');
var router = express.Router();
var createRequestSoapClient = require('./request_client_soap');
var requestSoapClient = createRequestSoapClient(router);

var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl";

requestSoapClient(wsdl, function(soapClient, req, res){

  var args = {};

  soapClient
    .setArgs(args)
    .setMethodToCall( function(client){
      return client.getMeses;
    })
    .execute();


} );


module.exports = router;